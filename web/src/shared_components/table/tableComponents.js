import {Grid} from "@material-ui/core";
import React from "react";
import {IconButton, Typography} from "@material-ui/core"
import {FormattedMessage, injectIntl} from "react-intl";

function Pagination(props) {
    const {handleChangePage, intl} = props;
    let maxPages = Math.floor(props.count / props.rowsPerPage);
    let arabic = intl.locale === "ar";
    return (
        <div style={{directione: "ltr"}}>
            <IconButton
                disabled={props.page === 0}
                onClick={() => handleChangePage(props.page - 1)}
            >
                {props.page > 0 ?
                    <img src={`static/left_arrow_active.svg`}
                         style={{
                             width: 15, height: 24, objectFit: "contain",
                             transform: `scaleX(${arabic ? -1 : 1})`
                         }}
                    /> :
                    <img src={`static/left_arrow.svg`}
                         style={{
                             width: 15, height: 24, objectFit: "contain",
                             transform: `scaleX(${arabic ? -1 : 1})`
                         }}
                    />}
            </IconButton>

            {Math.min((props.page + 1) * props.rowsPerPage, props.count)}
            <FormattedMessage id={"out_of"} defaultMessage={"out of "}/>
            {props.count}
            <IconButton
                disabled={props.page === maxPages}
                onClick={() => handleChangePage(props.page + 1)}
            >

                {props.page < maxPages ?
                    <img src="static/right_arrow_active.svg"
                         style={{
                             width: 15, height: 24, objectFit: "contain",
                             transform: `scaleX(${arabic ? -1 : 1})`
                         }}
                    /> : <img src="static/right_arrow.svg"
                              style={{
                                  width: 15, height: 24, objectFit: "contain",
                                  transform: `scaleX(${arabic ? -1 : 1})`
                              }}
                    />}
            </IconButton>

        </div>)
}

export default injectIntl(Pagination)