import React from 'react';
import {Grid, withStyles, TextField, Hidden, Typography, Button, Tabs, Tab, Paper} from '@material-ui/core'
import {FormattedMessage} from "react-intl";

const styles = (theme) => ({
    root: {
        margin: "3em auto 4em",
        maxWidth: 1040,
        minHeight: "90vh",
        padding: "0.75em",
        [theme.breakpoints.down("sm")]: {
            padding: "1.5em",
            margin: "0em auto 3em",
        }
    },
    title: {
        fontWeight: "bold",
        fontSize: "1.6em",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.4em",
        },
         margin: "1em 0 0.5em"
    },
    content: {
        fontSize: "1.1em",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.0em",
        },

    }

});

function About(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>
            <Typography variant={"h6"} className={classes.title}>
                <FormattedMessage id={"intro"}
                                  defaultMessage={"Introduction"}/>
            </Typography>
            <Typography className={classes.content}>
                <FormattedMessage id={"intro_content"}
                                  defaultMessage={"..."}/>
            </Typography>
            <Typography variant={"h6"} className={classes.title}>
                <FormattedMessage id={"what"}
                                  defaultMessage={""}/>
            </Typography>
            <Typography className={classes.content}>
                <FormattedMessage id={"what_content"}
                                  defaultMessage={""}/>
            </Typography>


            <Typography variant={"h6"} className={classes.title}>
                <FormattedMessage id={"how"}
                                  defaultMessage={""}/>
            </Typography>
            <Typography className={classes.content}>
                <FormattedMessage id={"how_content"}
                                  defaultMessage={""}/>
            </Typography>

            <Typography variant={"h6"} className={classes.title}>
                <FormattedMessage id={"whatHSTS"}
                                  defaultMessage={""}/>
            </Typography>
            <Typography className={classes.content}>
                <FormattedMessage id={"whatHSTS_content"}
                                  defaultMessage={""}/>
            </Typography>
        </div>
    )

}


export default withStyles(styles)(About);