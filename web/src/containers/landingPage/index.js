import React from 'react';
import {Grid, withStyles, TextField, Hidden, Typography, Button, Tabs, Tab, Paper} from '@material-ui/core'
import Table from "../../shared_components/table"
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';

// import results3 from "../../../final_results.json"
import {FormattedMessage, injectIntl} from "react-intl";
import Autosuggest from "./autosuggest"


function augmentResults(myList) {
  return myList.map((ent) => {
    let grade = "F";

    if (ent["HTTPS Live"])
      grade = "D";
    if (ent["HTTPS Live"] && ent["Domain Supports HTTPS"])
      grade = "C";
    if (ent["HTTPS Live"] && ent["Domain Supports HTTPS"] && ent["Domain Enforces HTTPS"])
      grade = "B";
    if (ent["HTTPS Live"] && ent["Domain Supports HTTPS"] && ent["Domain Enforces HTTPS"] && ent["HSTS"])
      grade = "A";

    ent.grade = grade;
    return ent;
  });
}


const styles = (theme) => ({
  root: {
    margin: "1em auto",
    maxWidth: 1040,
  },
  table: {
    width: '100%',
    padding: "0 16px",
    maxWidth: '1200px',
    minHeight: 800,
    [theme.breakpoints.down("sm")]: {
      marginBottom: "3em",
      maxWidth: 700,
    },
    [theme.breakpoints.down("xs")]: {
      padding: "0 16px",
      marginBottom: "3em",
      maxWidth: 600,
    },
    marginBottom: "8em"
  },
  aggregate: {
    maxWidth: 800,
    padding: "0 16px",
    margin: "auto"
  },
  graphs: {
    padding: "0 1em",
    [theme.breakpoints.down("sm")]: {
      padding: 0
    },
  },
  container: {
    margin: '1em',
    [theme.breakpoints.down("sm")]: {
      margin: '0.5em',
    },
    height: '100%'
  },
  typography: {
    width: '100%',
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: 14,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 11,
    },
  },
  searchBox: {
    margin: "1em 0",
  },
  card: {
    // padding: '2em',
    padding: "1em",
    [theme.breakpoints.down("sm")]: {
      padding: 0,
    },
    height: '100%'
  },
  mainTitle: {
    fontWeight: "bold",
    fontSize: 50,
    [theme.breakpoints.down("sm")]: {
      fontSize: 32,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 28,
    },

    margin: '1.5em 0em 0em',
    // fontSize: 50
  }, subTitle: {
    maxWidth: 750,
    margin: '30px 0em 2em',
    fontSize: 18,
    [theme.breakpoints.down("sm")]: {
      fontSize: 16,
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: 14,
    },

    // fontSize: 50
  }

});

const colors = [
  "#DD4814",
  "#F28E2E",
  "#F9C526",
  "#8DBD63",
  "#14B7B8"
]

function getUnique(a) {
  let b = [];
  for (let i = 0; i < a.length; i++) {
    if (a[i] && !b.find(x => x === a[i]))
      b.push(a[i]);
  }
  return b;
}

class Landing extends React.Component {
  state = {
    add: 0,
    search: "",
    results: [],
    myFilter: "",
  }
  keyMap = () => [
    {
      key: "Domain",
      search: true
    },
    {
      key: this.props.intl.locale === "en" ? "agency_en" : "Agency",
      search: true
    },
    {
      key: "Domain Supports HTTPS",
      calculateProgress: (data) => {
        let cnt = 0;
        let res = this.getFilteredResults();
        for (let i in res) {
          if (res[i]["Domain Supports HTTPS"])
            cnt++;
        }
        return Math.round(100 * cnt / Math.max(res.length, 1), 2);
      }
    },
    {
      key: "Domain Enforces HTTPS",
      calculateProgress: (data) => {
        let cnt = 0;
        let res = this.getFilteredResults();
        for (let i in res) {
          if (res[i]["Domain Enforces HTTPS"])
            cnt++;
        }
        return Math.round(100 * cnt / Math.max(res.length, 1), 2);
      }
    },
    {
      key: "HSTS",
      calculateProgress: (data) => {
        let cnt = 0;
        let res = this.getFilteredResults();
        for (let i in res) {
          if (res[i]["HSTS"])
            cnt++;
        }
        return Math.round(100 * cnt / Math.max(res.length, 1), 2);
      }
    },
    {
      key: "grade",
      search: false
    },
  ];

  componentDidMount() {
    fetch("https://vy2d3yz8n3.execute-api.eu-central-1.amazonaws.com/Prod/get_list")
      .then(
        response => {
          if (response.ok)
            return response.json();
          else
            throw new Error("Request Failed");
        }, networError => {
          console.log(networError.message);
        })
      .then(jsonResponse => {
        // this.setState({results:})
        console.log("jsonResponse", jsonResponse)
        let res = augmentResults(jsonResponse.map((el) => el.result));
        this.setState({results: res});
      });
  }

  renderAggregateProgress() {
    let res = [];
    let items = this.keyMap();
    for (let i in items) {
      if (items[i].calculateProgress)
        res.push(this.renderProgress(items[i]));
    }
    return res;

  }

  renderProgress(keyMapItem) {
    const {classes} = this.props;
    const {add} = this.state;
    let p = keyMapItem.calculateProgress();
    return <Grid item xs={4} md={4} lg={4}>
      <div className={classes.container}>
        <Grid container alignItems={"flex-start"} direction={"row"} justify={"space-between"}
              className={classes.card}>

          <CircularProgressbar value={p} maxValue={100} text={`${p}%`}
                               styles={buildStyles({
                                 // Rotation of path and trail, in number of turns (0-1)
                                 rotation: 0,
                                 // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                 strokeLinecap: 'butt',
                                 // Text size
                                 textSize: '24px',


                                 // How long animation takes to go from one percentage to another, in seconds
                                 pathTransitionDuration: 0.8,

                                 // Can specify path transition in more detail, or remove it entirely
                                 // pathTransition: 'none',

                                 // Colors
                                 pathColor: colors[Math.floor(p / 20)],
                                 textColor: '#000',

                                 trailColor: '#d6d6d6',
                                 backgroundColor: '#3e98c7',
                               })}

          />
          <Typography className={classes.typography}
                      variant={'h6'} align={'center'}>
            <FormattedMessage id={keyMapItem["key"]}
                              defaultMessage={keyMapItem["key"]}/>
          </Typography>

        </Grid>
      </div>
    </Grid>

  }

  getFilteredResults = () => {
    const {search, results} = this.state;
    return results.filter((en) => en["Agency"] === search || en["agency_en"] === search || !search);
  }

  render() {
    const {classes, intl} = this.props;
    const {search, results} = this.state;
    let ar = intl.locale === "ar";
    let agencies = getUnique(results.map(item => item.Agency));
    if (!ar)
      agencies = getUnique(results.map(item => item["agency_en"]));
    return (
      <div className={classes.root}>

        <Grid container justify={'space-around'}>

          <div className={classes.table}>
            <div className={classes.aggregate}>
              <Typography variant={'h3'} align={'center'}
                          classes={{root: classes.mainTitle}}>

                <FormattedMessage id="mainTitle"/>
              </Typography>
              <Grid container justify={'space-around'}>
                <Typography align={'center'}
                            classes={{root: classes.subTitle}}>
                  <FormattedMessage id="subTitle"/>
                </Typography>
              </Grid>
              <Grid className={classes.graphs} container justify={'space-between'} alignItems={"stretch"}>
                {this.renderAggregateProgress()}

              </Grid>
            </div>
            <div className={classes.searchBox}>
              <Autosuggest
                value={search}
                onChange={(val) => {
                  this.setState({search: val})
                }}
                onBlur={() => {
                  if (!agencies.find((a) => a === search))
                    this.setState({search: ""});

                }}
                placeholder={intl.formatMessage({id: "searchHelperText"})}
                suggestions={agencies}/>
              <div
                style={{
                  position: 'relative',
                  padding: "0 1em",

                }}>
                <img src="static/search.svg"
                     style={{
                       width: 36, height: 21,
                       position: 'absolute',
                       left: ar ? 'unset' : `calc( 100% - 50px)`,
                       right: ar ? `calc( 100% - 50px)` : 'unset',
                       top: -37,

                       objectFit: "contain"
                     }}
                />
              </div>

            </div>
            <Table data={this.getFilteredResults()}
                   keyMap={this.keyMap()}/>

          </div>
        </Grid>
      </div>
    )
  }
}


export default withStyles(styles)(injectIntl(Landing));