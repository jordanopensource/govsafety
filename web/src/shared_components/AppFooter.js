/**
 * Created by salalem on 12/02/19.
 */
import React, {Component} from 'react';
import {withStyles, Grid, Typography} from '@material-ui/core';

const styles = (theme) => ({

    hrVertical: {
        border: 'none',
        borderLeft: '3px solid hsla(200, 10%, 50%,100)',
        borderColor: '#322f31',
        height: '2vh',
        width: '1px'
    },

    parentDiv: {
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    hrHorizontalL: {
        marginLeft: '11%',
        color: theme.palette.primary.main,
        [theme.breakpoints.up("lg")]: {
            opacity: 0.6,
        },
    },

    hrHorizontalR: {
        color: theme.palette.primary.main,
        marginRight: '11%',
        [theme.breakpoints.up("lg")]: {
            opacity: 0.6
        },
    },

    logo: {
        [theme.breakpoints.up("lg")]: {
            width: '14%',
        },
        [theme.breakpoints.down("md")]: {
            width: '20%',
        },
        [theme.breakpoints.only("xs")]: {
            width: '30%',
        },
        textAlign: 'center'
    },

    listDiv: {
        display: 'flex',
        width: '100%',
        [theme.breakpoints.up("lg")]: {
            paddingLeft: '7%',
            paddingTop: '1em'
        },
        [theme.breakpoints.down("md")]: {
            paddingTop: '6%',
            paddingLeft: '11%',
        },
        [theme.breakpoints.only("xs")]: {
            paddingTop: '8%',
            paddingLeft: '4.5%',
        },
    },

    listItem: {
        textAlign: 'center',
        [theme.breakpoints.up("lg")]: {
            paddingTop: '0.2em',
            paddingRight: '1em',
            paddingLeft: '1em',
        },
        [theme.breakpoints.down("sm")]: {
            width: '25%',
        },
        [theme.breakpoints.only("md")]: {
            width: '30%',
        },
    },

    hrWidth: {
        [theme.breakpoints.up("lg")]: {
            width: '46%',
        },
        [theme.breakpoints.down("md")]: {
            width: '30%',
        },
    },
    poweredByDiv: {
        paddingBottom: '5em',
        [theme.breakpoints.down("lg")]: {
            paddingLeft: '7.7%',
        },
        [theme.breakpoints.only("sm")]: {
            paddingLeft: '13%',
        },
        [theme.breakpoints.only("md")]: {
            paddingLeft: '15%',
        },
    },
    footerDiv: {
        background: theme.palette.background.grayDark,
        [theme.breakpoints.up("md")]: {
            zIndex: 1201,
            position: 'absolute'
        },
        [theme.breakpoints.down("sm")]: {
            position: 'relative',
            marginTop: '3em',
            bottom: '0;'
        },
    }
});

class AppFooter extends Component {
    constructor() {
        super();
    }


    render() {
        const {classes} = this.props;
        return (
            <Grid container className={classes.footerDiv}>
                <div className={classes.parentDiv}>
                    <div className={classes.hrWidth}>
                        <hr className={classes.hrHorizontalL}/>
                    </div>
                    <div className={classes.logo}>
                        <img src={"/static/full_logo.png"} width={"95%"}/>
                    </div>
                    <div className={classes.hrWidth}>
                        <hr className={classes.hrHorizontalR}/>
                    </div>
                </div>
                <Grid container>
                    <Grid lg={4} xs={12} md={8} sm={8} className={classes.listDiv}>
                        <div className={classes.listItem}>
                            <Typography variant={'subtitle1'} style={{color: '#d2d2d2', cursor: 'pointer'}}>
                                About us
                            </Typography>
                        </div>
                        <div style={{width: '2%'}}>
                            <hr className={classes.hrVertical}/>
                        </div>
                        <div className={classes.listItem}>
                            <Typography variant={'subtitle1'} style={{color: '#d2d2d2', cursor: 'pointer'}}>
                                Support
                            </Typography>

                        </div>
                        <div style={{width: '2%'}}>
                            <b>
                                <hr className={classes.hrVertical}/>
                            </b>
                        </div>
                        <div className={classes.listItem}>
                            <Typography variant={'subtitle1'} style={{color: '#d2d2d2', cursor: 'pointer'}}>
                                Contact Us
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
                <Grid container className={classes.poweredByDiv}>
                    <Grid xs={6} sm={6} md={6} lg={3}>
                        <div style={{display: 'flex'}}>
                            <Typography style={{display: 'flex'}} variant={'h6'}>
                                <Typography variant={'subtitle2'}
                                            style={{opacity: 0.7, paddingTop: '0.3em', paddingRight: '0.2em'}}>Generators
                                    - KOSTAL Jordan</Typography>
                                <b>©</b></Typography>
                        </div>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

AppFooter.defaultProps = {};

AppFooter.propTypes = {};

export default withStyles(styles)(AppFooter);
