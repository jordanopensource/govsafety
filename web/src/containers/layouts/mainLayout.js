import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
    Hidden,
    Button,
    Grid,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    Divider,
    ListItemText,
    IconButton,
    NoSsr
} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {FormattedMessage} from "react-intl";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link'
import Router from 'next/router'

const styles = (theme) => ({
    root: {
        flexGrow: 1,
        width: "100%",
        direction: "rtl"
    },
    appBar: {
        height: 140,

        padding: "0 46px",
        [theme.breakpoints.down("sm")]: {
            padding: 0,
            height: 73,
        },
        background: 'white',
        direction: "rtl"
    },
    logo: {
        width: 200, height: 60, objectFit: "contain",
        [theme.breakpoints.down("sm")]: {
            width: 100, height: 30,
        },
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        [theme.breakpoints.down("sm")]: {
            margin: 0
        },

    },
    list: {
        width: 200,
    },
    fullList: {
        width: 'auto',
    },
    tab: {
        fontSize: 18,
        margin: "0 18px"
    },
    hidden: {
        height: "100%"
    },
    references: {
        maxWidth: 200,
        margin: '1em auto 4em ',
        [theme.breakpoints.down("sm")]: {
            maxWidth: 140,

        }
    },
    josa: {
        maxWidth: 350,
        margin: 'auto',
        direction: "ltr",
        [theme.breakpoints.down("sm")]: {
            maxWidth: 250,
        }
    }
});

class SimpleAppBar extends React.Component {
    state = {drawerOpen: false};

    render() {
        const {classes, children, locale, onLangChange} = this.props;
        const {drawerOpen} = this.state;
        const barButtons = [
            {
                title: <FormattedMessage id={"home"} defaultMessage={"Home"}/>,
                path: "/",
                action: () => Router.push("/" + (Router.query.lang ? "?lang=" + Router.query.lang : ""))
            },
            {
                title: <FormattedMessage id={"abthttps"} defaultMessage={"About Https"}/>,
                path: "/about",
                action: () => Router.push("/about" + (Router.query.lang ? "?lang=" + Router.query.lang : ""))
            },
            {
                title: <FormattedMessage id={"imphttps"} defaultMessage={"Importance of Https"}/>,
                path: "/importance",
                action: () => Router.push("/importance" + (Router.query.lang ? "?lang=" + Router.query.lang : ""))
            },
            {
                title: <FormattedMessage id={"methodology"} defaultMessage={"Methodology"}/>,
                path: "/methodology",
                action: () => Router.push("/methodology" + (Router.query.lang ? "?lang=" + Router.query.lang : ""))
            },
            {
                title: <FormattedMessage id={"toChangeLanguage"} defaultMessage={"Other Lang"}/>,
                action: () => onLangChange(locale === "ar" ? "en" : "ar")
            }
        ]

        const sideList = (
            <div className={classes.list}>
                <List>
                    {barButtons.map((item) => (
                        <ListItem alignItems={"center"} button key={item.title}>
                            <ListItemText
                                onClick={item.action}
                                primary={<Typography align={'center'}> {item.path === Router.route ?
                                    <b>{item.title}</b> : item.title}</Typography>}/>
                        </ListItem>
                    ))}
                </List>


            </div>
        );

        return (
            <div className={classes.root}>
                <Drawer
                    style={{direction: locale === "en" ? "ltr" : "rtl"}}
                    anchor="right" open={drawerOpen} onClose={() => this.setState({drawerOpen: false})}>
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={() => this.setState({drawerOpen: false})}
                        onKeyDown={() => this.setState({drawerOpen: false})}
                    >
                        {sideList}
                    </div>
                </Drawer>

                <AppBar className={classes.appBar}

                        position="static" color="default" elevation={0}
                        style={{
                            border: "solid rgba(66, 66, 66, 0.3)",
                            borderWidth: "1px 0px",
                            direction: locale === "en" ? "ltr" : "rtl"
                        }}
                >
                    <Hidden smDown implementation={"css"} className={classes.hidden}>
                        <Grid style={{height: "100%"}} container alignItems={'center'}>
                            <Toolbar style={{width: "100%"}}>
                                <Grid container justify={"space-between"} alignItems={'center'}>
                                    {locale === "en" ?
                                        <img src="static/english_logo.svg"
                                             className={classes.logo}
                                        /> :
                                        <img src="static/group-9.svg"
                                             className={classes.logo}
                                        />}

                                    <div>
                                        {barButtons.map((button) =>
                                            <Button className={classes.tab} onClick={button.action}>
                                                {button.path === Router.route ?
                                                    <b>{button.title}</b> : button.title}
                                            </Button>
                                        )}
                                    </div>

                                </Grid>
                            </Toolbar>
                        </Grid>
                    </Hidden>
                    <Hidden mdUp implementation={"css"} className={classes.hidden}>
                        <Grid style={{height: "100%"}} container alignItems={'center'}>
                            <Toolbar style={{width: "100%", direction: 'rtl'}}>

                                <Grid container justify={"space-between"} alignItems={'center'}>
                                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                                                onClick={() => this.setState({drawerOpen: true})}
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                    {locale === "en" ?
                                        <img src="static/english_logo.svg"
                                             className={classes.logo}
                                        /> :
                                        <img src="static/group-9.svg"
                                             className={classes.logo}
                                        />}


                                </Grid>
                            </Toolbar>
                        </Grid>
                    </Hidden>
                </AppBar>
                <div style={{direction: locale === "en" ? "ltr" : "rtl"}}>
                    {children}
                </div>
                <div
                    className={classes.josa}
                >
                    <Link href={"https://jordanopensource.org/"}>
                        <Typography variant={'h6'} align={'center'} style={{cursor: 'pointer'}}> <FormattedMessage
                            id={"josa"}/> </Typography>
                    </Link>
                    <Grid container justify={"space-around"} className={classes.references}>
                        <Link href={"https://facebook.com/jordanopensource"}>

                            <IconButton
                            >
                                <img src="static/facebook.svg"
                                     style={{width: 10, height: 20, objectFit: "contain"}}
                                />
                            </IconButton>
                        </Link>
                        <Link href={"https://twitter.com/jo_osa"}>

                            <IconButton>
                                <img src="static/twitter.svg"
                                     style={{width: 21, height: 16, objectFit: "contain"}}
                                />
                            </IconButton>
                        </Link>
                        <Link href={"https://www.instagram.com/jordanopensource/"}>

                            <IconButton>
                                <img src="static/instagram.svg"
                                     style={{width: 18, height: 18, objectFit: "contain"}}
                                />
                            </IconButton>
                        </Link>
                    </Grid>
                </div>
            </div>
        );
    }
}

SimpleAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleAppBar);