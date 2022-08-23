from pshtt import pshtt, utils
import csv, json, logging
import boto3
import threading, time
import subprocess


def get_table(table_name):
    dynamodb = boto3.resource('dynamodb')
    return dynamodb.Table(table_name)


keys_of_interest = ['HTTPS Live', 'Domain Supports HTTPS', 'Domain Enforces HTTPS', 'HSTS', 'agency_en', 'agency_ar',
                    'Agency', 'Domain']


def append_domains_with_translations(processed_domains, translations):
    res = []
    for processed_domain in processed_domains:
        if processed_domain['Live']:
            to_add = {}
            for key in processed_domain.keys():
                if key in keys_of_interest:
                    to_add[key] = processed_domain[key]
            domain = to_add['Domain']
            domain_key = None
            if domain in translations:
                domain_key = domain
            elif "www." + domain in translations:
                domain_key = "www." + domain
            if domain_key:
                to_add['Agency'] = translations[domain_key][0]
                to_add['agency_ar'] = translations[domain_key][0]
                to_add['agency_en'] = translations[domain_key][1]
            else:
                print(domain, ': Not found in translations')
            res.append(to_add)
    return res


def get_all_domains():
    domains = []
    translations = {}
    with open('gov_websites_list.csv', mode='r') as test_file:
        spamreader = csv.reader(test_file)
        first_line = True
        for row in spamreader:
            if first_line:
                first_line = False
                continue
            domains.append(row[0])
            translations[row[0]] = [row[1], row[2]]

    return domains, translations


def inspect_domains(target_domains, translations):
    # print("xx")
    # logging.getLogger().setLevel(logging.DEBUG)
    # utils.configure_logging(True)
    processed_domains = pshtt.inspect_domains(target_domains, {'timeout': 1})
    # print("pshtt done")
    # print("res", processed_domains)
    appended_domains = append_domains_with_translations(list(processed_domains), translations)
    # print("appended_domains", appended_domains)
    current_list = {}

    for d in appended_domains:
        current_list[d['Domain']] = d
    return current_list


def handle_update_website(target_domains, translations):
    processed_domains = inspect_domains(target_domains, translations)
    table = get_table("Websites")
    for key in processed_domains:
        print("updating", key)
        table.put_item(
            Item={'domain': key, 'result': processed_domains[key]})


def update_websites(event, context):
    domains, translations = get_all_domains()
    threads = []
    BATCH_SIZE = 4
    batch = []
    for domain in domains:
        batch.append(domain)
        if len(batch) == BATCH_SIZE:
            threads.append(threading.Thread(target=handle_update_website,
                                            kwargs={'target_domains': batch, 'translations': translations}))
            batch = []

    # Start all threads
    for x in threads:
        x.start()
        time.sleep(0.5)
    print("threads started")
    # Wait for all of them to finish
    for x in threads:
        x.join()
    print("threads done")

    return None


def fetch_processed_data(event, context):
    table = get_table("Websites")
    response = table.scan()
    data = response['Items']
    last_evaluated_key = response.get('LastEvaluatedKey', None)
    while last_evaluated_key:
        scan_kwargs = {}
        scan_kwargs['ExclusiveStartKey'] = last_evaluated_key
        response = table.scan(**scan_kwargs)
        last_evaluated_key = response.get('LastEvaluatedKey', None)
        data.extend(response['Items'])

    return {
        'headers': {
            'Access-Control-Allow-Origin': "*",
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': 'DELETE, GET, HEAD, OPTIONS, PATCH, POST, PUT',
            "X-Requested-With": "*"
        },
        'statusCode': 200,
        'body': json.dumps(data)
    }
