import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import {
    withStyles, Table, TableBody, TableCell, TablePagination, TableRow, Hidden,
    Paper, Tooltip, Grid, InputBase, Typography, TableHead, Toolbar, TableSortLabel
} from '@material-ui/core';
import {fade, lighten} from '@material-ui/core/styles/colorManipulator';
import SearchIcon from '@material-ui/icons/Search';
import Pagination from "./tableComponents";
import {FormattedMessage, injectIntl} from "react-intl";

const notCenter = ["Domain", "Agency", "agency_en"];

class MyTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const {mobile, order, orderBy, keyMap, locale, classes} = this.props;
        let cells = [];
        let myKeyMap = keyMap.slice();
        if (mobile) {
            myKeyMap = keyMap.slice(2);
            myKeyMap.unshift({label: "Domain(Agency)", key: "Domain(Agency)"})
        }
        for (let i = 0; i < myKeyMap.length; i++) {
            let el = myKeyMap[i];
            let cell = <TableCell
                key={el.key}
                align={notCenter.find((c) => c === el.key) ? (locale === "en" ? 'left' : "right") : "center"}
                className={classes.cellHeader}
                sortDirection={orderBy === el.key ? order : false}
            >
                <Tooltip
                    title="Sort"
                    placement={'bottom-end'}
                    enterDelay={300}
                >
                    <TableSortLabel
                        active={orderBy === el.key}
                        direction={order}
                        onClick={this.createSortHandler(el.key)}
                    >
                        <Typography align={'center'} className={classes.cellText}
                                    style={{color: 'white', fontWeight: "bold", width: '100%'}}>
                            <FormattedMessage id={(el.label || el.key) + (mobile ? "_short" : "")}
                                              defaultMessage={el.label || el.key}/>

                        </Typography>

                    </TableSortLabel>
                </Tooltip>
            </TableCell>;
            cells.push(cell);
        }

        return (
            <TableHead style={{background: "#3897c0"}}>
                <TableRow>
                    {cells}
                </TableRow>
            </TableHead>
        );
    }
}

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        // minWidth: 1020,

    },
    tableWrapper: {
        // overflowX: 'auto',
    },
    cell: {

        padding: "1px 1px 1px 1px !important",
        maxWidth: 20,
        [theme.breakpoints.up("md")]: {
            padding: "1px 16px 1px 16px !important",
            // padding: "4px 56px 4px 24px",
            maxWidth: 300,
        },
    },
    cellText: {
        fontSize: "0.675rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "0.775rem"
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "0.875rem"
        },
    },
    cellTextSmall: {
        fontSize: "0.6rem",
        [theme.breakpoints.up("sm")]: {
            fontSize: "0.775rem"
        },
        [theme.breakpoints.up("md")]: {
            fontSize: "0.875rem"
        },
    },
    cellHeader: {

        padding: "1px !important",
        maxWidth: 20,
        [theme.breakpoints.up("md")]: {
            padding: "1px 16px 1px 16px !important",
            // padding: "4px 56px 4px 24px",
            maxWidth: 300,
        },
    },
    downloadButton: {
        margin: '2px 10px',
    },
    spacer: {
        flex: '1 1 100%',
    },
});
let EnhancedTableHead = withStyles(styles)(MyTableHead)

class EnhancedTable extends React.Component {
    state = {
        order: 'asc',
        selected: [],
        search: "",
        lastParams: {},
        changeRequests: 0,
        addOpenDialog: false,
        changes: {},
        selectedElement: {},
        page: 0,
        addCounter: 0,
        action: null,
        rowsPerPage: 10,
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({order, orderBy});
    };

    handleSelectAllClick = event => {
        if (event.target.checked) {
            this.setState(state => ({selected: state.data.map(n => n.id)}));
            return;
        }
        this.setState({selected: []});
    };


    handleChangePage = (page) => {

        this.setState({page});
    };

    fixValue = (val) => {
        if (val === "true")
            return <img src="static/YES.svg"
                        style={{marginLeft: 0, width: 24, height: 24, objectFit: "contain"}}
            />;
        else if (val === "false")
            return <img src="static/NO.svg"
                        style={{marginLeft: 0, width: 24, height: 24, objectFit: "contain"}}
            />;
        else
            return val;
    };


    handleChangeRowsPerPage = event => {
        this.setState({rowsPerPage: event.target.value, page: 0});
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    getKeyMap = (obj) => {
        if (this.props.keyMap)
            return this.props.keyMap;

        let res = [];
        for (let key in obj)
            if (obj.hasOwnProperty(key))
                res.push({key});
        return res;
    };
    getContent = (item, keyMapEl, text) => {
        if (keyMapEl.getValue) {
            if (keyMapEl.getValue(item) && keyMapEl.getValue(item).html) {
                if (text)
                    return keyMapEl.getValue(item).text;
                else
                    return keyMapEl.getValue(item).html;
            }

            return keyMapEl.getValue(item);
        }
        if (keyMapEl.type === "fk") {
            let fk = keyMapEl.targetList.find((el) => el.id === item.id);
            if (!fk)
                return null;
            if (keyMapEl.optionLabelFunction) {
                return keyMapEl.optionLabelFunction(fk);
            }
            return fk[keyMapEl.optionLabel || keyMapEl.key]
        }

        return "" + item[keyMapEl.key];
    };

    getRowCells = (item, mobile = false) => {
        let cells = [], mobileCells = [];
        const {classes} = this.props;
        let keys = this.getKeyMap(item);
        let align = this.props.intl.locale === "en" ? 'left' : "right";

        for (let i = 0; i < keys.length; i++) {
            let c = this.getContent(item, keys[i]);
            let a = align;
            if (c === "true" || c === "false" || keys[i].key === "grade")
                a = "center";
            let cell = <TableCell component="th" scope="row"
                                  align={a}
                                  className={classes.cell}
            >
                <Typography noWrap>
                    {this.fixValue(c)}
                </Typography>
            </TableCell>;

            cells.push(cell);
            if (i > 1)
                mobileCells.push(cell);
        }
        mobileCells.unshift(<TableCell component="th" scope="row"
                                       align={align}
                                       className={classes.cell}
                                       style={{maxWidth: 50}}
        >
            <Typography className={classes.cellText} noWrap>
                {this.getContent(item, keys[0])}
            </Typography>
            <Typography className={classes.cellTextSmall} noWrap>
                <b> ({this.getContent(item, keys[1])})</b>
            </Typography>
        </TableCell>);
        return mobile ? mobileCells : cells;


    };

    filterData = (data) => {
        const {keyMap} = this.props;
        const {search} = this.state;
        let searchableCols = keyMap.filter((col) => col.search).map((col) => col.key);
        if (search)
            return data.filter((d) => {
                let found = false;
                for (let i in searchableCols) {
                    if (d[searchableCols[i]] && d[searchableCols[i]].toLowerCase().indexOf(this.state.search.toLowerCase()) !== -1)
                        found = found || true;
                }
                return found;
            });
        return data;
    }

    renderTable = (mobile) => {
        const {classes, data, filterMap, theme, intl} = this.props;
        const {order, orderBy, selected, rowsPerPage, page} = this.state;
        let items = this.filterData(data);
        let count = items.length;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage);
        return (
            <Paper className={classes.root} elevation={0}>
                <Grid container direction={'row-reverse'}>

                    <Pagination rowsPerPage={rowsPerPage} page={page} count={count}
                                handleChangePage={this.handleChangePage}/>
                </Grid>

                <div className={classes.tableWrapper}>
                    <Table className={classes.table} aria-labelledby="tableTitle">
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            mobile={mobile}
                            keyMap={this.getKeyMap(items[0])}
                            orderBy={orderBy}
                            onSelectAllClick={this.handleSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={count}
                            locale={intl.locale}
                        />
                        <TableBody id={"scrollTargetTable"}>

                            {stableSort(items, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(item =>
                                    <TableRow
                                        hover
                                        // onClick={event => this.handleClick(event, item.id)}
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={item.id}
                                    >
                                        {this.getRowCells(item, mobile)}
                                    </TableRow>
                                )}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 49 * emptyRows}}>
                                    <TableCell
                                        colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>


            </Paper>
        );
    }

    render() {

        return (
            <div>
                <Hidden mdUp implementation={"css"}>
                    {this.renderTable(true)}
                </Hidden>
                <Hidden smDown implementation={"css"}>
                    {this.renderTable(false)}
                </Hidden>
            </div>
        );
    }
}

EnhancedTable.propTypes = {
    classes: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    keyMap: PropTypes.object,
    filterMap: PropTypes.object,
};

export default withStyles(styles, {withTheme: true})(injectIntl(EnhancedTable));

