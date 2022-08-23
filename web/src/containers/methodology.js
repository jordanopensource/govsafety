import React from 'react';
import {Grid, withStyles, TextField, Hidden, Typography, Button, Tabs, Tab, Paper} from '@material-ui/core'
import {FormattedMessage} from "react-intl";

const styles = (theme) => ({
    root: {
        margin: "3em auto 8em",
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

    }, contentTitle: {
        fontWeight: "bold",
        marginTop: "0.5em",
        fontSize: "1.1em",
        [theme.breakpoints.down("sm")]: {
            fontSize: "1.0em",
        },

    },
    border: {
        border: "1px solid black",
        borderCollapse: "collapse"
    }

});

function Meth(props) {
    const {classes} = props;
    return (
        <div className={classes.root}>

            <Typography className={classes.content}>
                <FormattedMessage id={"meth_subtitle"}
                                  defaultMessage={""}/>
            </Typography>
            {[1, 2, 3, 4, 5].map((x) => <div>
                <Typography variant={"h6"} className={classes.title}>
                    <FormattedMessage id={`meth_step${x}`}
                                      defaultMessage={""}/>
                </Typography>
                <Typography className={classes.content}>
                    <FormattedMessage id={`meth_step${x}_content`}
                                      defaultMessage={""}/>
                </Typography>

            </div>)}
            <ul>
                {[1, 2, 3].map((x) => <li>
                    <Typography className={classes.content}>
                        <FormattedMessage id={`meth_step5_bullet${x}`}
                                          defaultMessage={"..."}/>
                    </Typography></li>)}

            </ul>
            <br/>
            <Typography className={classes.content}>
                <FormattedMessage id={`meth_score_subtitle`}
                                  defaultMessage={""}/>
            </Typography>
            <table className={classes.border} style={{width: "100%", margin: "1em 0em"}}>
                <tr className={classes.border}>
                    <th className={classes.border} scope="col"><FormattedMessage id={`score`}
                                                                                 defaultMessage={"Score"}/></th>
                    <th scope="col"><FormattedMessage id={`description`}
                                                      defaultMessage={"Description"}/></th>
                </tr>


                {["A", "B", "C", "D", "F"].map((x) => <tr className={classes.border}>
                    <td className={classes.border}>


                        <Typography align={'center'} className={classes.content}>
                            <b>
                                {x}
                            </b>
                        </Typography>
                    </td>
                    <td>
                        <Typography style={{padding: "0em 1em"}} className={classes.content}>
                            <FormattedMessage id={`${x}_desc`}
                                              defaultMessage={"..."}/>
                        </Typography></td>
                </tr>)}


            </table>

        </div>
    )

}


export default withStyles(styles)(Meth);