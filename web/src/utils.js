import {base, ticket as ticketPath} from "./sagas/constants";
import {Link, DirectLink, Element, Events, animateScroll as scroll, scrollSpy, scroller} from 'react-scroll'
import Router from "next/dist/lib/router";

export function getEditPermission(user) {
    let val = Router.asPath;
    let tabs = [];
    if (user.edit_tabs) {
        tabs = user.edit_tabs;
    } else {
        return false;
    }
    if (val && val[val.length - 1] === "/")
        val = val.slice(0, -1);
    return user.is_superuser || tabs.find((tab) => tab.ext === val);
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export function generateCases(str) {
    return [str, `${str}_SUCCEEDED`, `${str}_FAILED`]
}

export function generateConstants(base, get = true, post = true, patch = true, del = true) {
    let word = base.toLocaleUpperCase();
    let res = [];
    if (get)
        res = res.concat(generateCases(`GET_${word}`));
    if (post)
        res = res.concat(generateCases(`POST_${word}`));
    if (patch)
        res = res.concat(generateCases(`PATCH_${word}`));
    if (del)
        res = res.concat(generateCases(`DELETE_${word}`));
    return res;

}


export const urlParamsToDict = (url) => {
    if (!url.split("?")[1])
        return {};
    let res = {};
    let params = url.split("?")[1].split("&");
    for (let i = 0; i < params.length; i++) {
        res[params[i].split("=")[0]] = params[i].split("=")[1];
    }
    console.log("res", res)
    return res;
};
export const paramsToPostfix = (obj, method) => {
    let str = "?";
    if (method === "GET")
        str = "/?";
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            str += `${key}=${obj[key]}&`;
        }
    }
    return str === "?" ? "/" : str;
};
let paginationParams = ['limit', 'offset'];

function paginationParam(str) {
    for (let i = 0; i < paginationParams.length; i++) {
        if (str.split("=")[0] === paginationParams[i])
            return true;
    }
    return false;

}

export const checkIfReqIdenticalExceptPagination = (req1, req2) => {
    if (req1.split('?')[0] !== req2.split('?')[0])
        return false;
    let param1Str = req1.split('?')[1];
    let param2Str = req2.split('?')[1];
    let params1 = [];
    if (param1Str)
        params1 = param1Str.split("&");
    let params2 = [];
    if (param2Str)
        params2 = param2Str.split("&");
    let unique1 = params1.find((p1) => !paginationParam(p1) && !params2.find((p2) => p1 === p2));
    let unique2 = params2.find((p1) => !paginationParam(p1) && !params1.find((p2) => p1 === p2));

    return !unique1 && !unique2;

}

export const getExistingUrlEquivalentTo = (url, obj) => {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (checkIfReqIdenticalExceptPagination(key, url))
                return key;
        }

    }
    return url;

}


export function validateEmail(email) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export function validatePassword(password) {
    let re = /^(?=.*[0-9])(?=.*[a-z])|(?=.*[0-9])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{6,}$/;
    return password.length > 7 && re.test(password);
}


export const guideTo = (currentKey, offset, containerId = null) => {
    // let scrollToComponent = require('react-scroll-to-component');
    setTimeout(() => {
        let target = document.getElementById(currentKey);

        let parent = document.getElementById("scroll-container");
        let container = document.getElementById("scroll-container-paper");
        if (!containerId)
            containerId = container.id;
        if (!container && parent) {
            let container = null;
            for (let i = 0; i < parent.children.length; i++) {
                console.log("parent.children[i]", parent.children[i])
                if (parent.children[i].className.indexOf("MuiDialog-container") !== -1)
                    container = parent.children[i];
            }
            console.log("container", container)
            if (container && !containerId) {
                console.log("containerin", container)
                container.id = "scroll-container-body";
                containerId = container.id;
            }
        }
        if (target) {
            target.style.transition = "background 1s";
            setTimeout(() => {
                target.style.background = '#ffd06e';
                setTimeout(() => {
                    target.style.background = 'inherit';
                }, 300)
                scroller.scrollTo(currentKey, {
                    duration: 800,
                    delay: 0,
                    offset: offset || -100,
                    align: 'top',
                    smooth: 'easeInOutQuart',
                    containerId: containerId
                })

            }, 500);
            return true;
        }
    }, 50);
    return false;

};


function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

export function exportCSVFile(headers, items, fileTitle) {
    if (headers) {
        items.unshift(headers);
    }

    // Convert Object to JSON
    var jsonObject = JSON.stringify(items);

    var csv = convertToCSV(jsonObject);

    var exportedFilenmae = fileTitle + '.csv' || 'export.csv';

    var blob = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, exportedFilenmae);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", exportedFilenmae);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}
