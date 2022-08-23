import React from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import {withStyles} from '@material-ui/core'

const styles = (theme) => ({

    dialogBody: {

        [theme.breakpoints.up("md")]: {
            overflow: 'visible',
            overflowY: 'visible',
            height: 'auto',
            maxHeight: 'none',
        },
    },
    test: {
        [theme.breakpoints.up("md")]: {
            overflow: 'visible',
        },
        width: '100%'
    }
});

class ResponsiveDialog extends React.Component {


    render() {
        const {classes, maxWidth, fullScreen, children, open, handleClose, title} = this.props;

        return (
            <div>
                <Dialog
                    id={"scroll-container"}
                    scroll={'body'}
                    className={classes.dialogBody}
                    PaperProps={{classes: {root: classes.test}, id: "scroll-container-paper"}}
                    fullScreen={fullScreen}
                    open={open}
                    maxWidth={maxWidth || 'md'}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">{title}</DialogTitle>
                    <DialogContent style={{height: '100%', overflow: 'visible'}}>
                        {children}
                        <div style={{height: '5%'}}/>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

ResponsiveDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    fullScreen: PropTypes.bool,
    title: PropTypes.string,
};

ResponsiveDialog.defaultProps = {
    fullScreen: true,
};

export default withStyles(styles)(withMobileDialog()(ResponsiveDialog));