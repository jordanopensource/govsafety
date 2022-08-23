import {CircularProgress, FormControl, TextField, Tooltip, withStyles} from "@material-ui/core";


import React from 'react';
import PropTypes from 'prop-types';
import deburr from 'lodash/deburr';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from "@material-ui/core/Typography/Typography";
import InputAdornment from '@material-ui/core/InputAdornment';

function renderInputComponent(inputProps) {
    const {
        classes, inputRef = () => {
        }, ref, ...other
    } = inputProps;
    return (
        <TextField
            fullWidth
            InputProps={{
                startAdornment: inputProps.dollar ? <InputAdornment position="start">$</InputAdornment> : null,
                inputRef: node => {
                    ref(node);
                    inputRef(node);
                },
                classes: {
                    input: classes.input,
                },
            }}
            {...other}
        />
    );
}

function renderSuggestion(suggestion, {query, isHighlighted}) {
    const matches = match(suggestion, query);
    const parts = parse(suggestion, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <Typography wrap>

                {parts.map((part, index) =>
                    part.highlight ? (
                        <strong key={String(index)} style={{fontWeight: 400}}>
                            {part.text}
                        </strong>
                    ) : (
                        <b key={String(index)} style={{fontWeight: 400}}>
                            {part.text}
                        </b>
                    ),
                )}
            </Typography>
        </MenuItem>
    );
}


function getSuggestions(suggestions, value) {
    const inputValue = deburr(value.trim()).toLowerCase();
    const inputLength = inputValue.length;

    let count = 0;

    return inputLength === 0
        ? suggestions
        : suggestions.filter(suggestion => {
            const keep =
                count < 5 && suggestion.toLowerCase().indexOf(inputValue) > -1;
            if (keep) {
                count += 1;
            }

            return keep;
        });
}

function getSuggestionValue(suggestion) {
    return suggestion;
}

const styles = theme => ({
    root: {
        height: 250,
        flexGrow: 1,
    },
    container: {
        position: 'relative',
    },
    suggestionsContainerOpen: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        padding: "0 1em",
        right: 0,
    },
    suggestion: {
        display: 'block',
    },
    suggestionsList: {
        margin: 0,
        padding: 0,
        listStyleType: 'none',
    },
    divider: {

        height: theme.spacing.unit * 2,
    },
    tooltip: {
        fontSize: theme.typography.pxToRem(14),
    },
    input: {
        height: 60,
        padding: "0 1em",
        fontSize: 16,
        [theme.breakpoints.down("sm")]: {
            fontSize: 16,
        },
        background: '#f7f6f5',

    },

});

class IntegrationAutosuggest extends React.Component {
    state = {
        blurred: false,
        suggestions: [],
    };

    handleSuggestionsFetchRequested = ({value}) => {
        const {suggestions} = this.props;
        this.setState({
            suggestions: getSuggestions(suggestions, value),
        });
    };

    handleSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };


    render() {
        const {classes, value, onChange, placeholder, onBlur} = this.props;
        const {suggestions} = this.state;


        const autosuggestProps = {
            renderInputComponent,
            suggestions: suggestions,
            onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
            onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
            getSuggestionValue,
            renderSuggestion,
        };
        return (


            <Autosuggest
                {...autosuggestProps}
                style={{position: 'relative'}}
                shouldRenderSuggestions={() => !value || !suggestions.find((s) => s === value)}

                inputProps={{
                    classes,
                    label: null,
                    value: value,
                    // dollar: dollar,
                    onBlur: onBlur,
                    placeholder: placeholder,

                    // helperText: (record && blurred) ? record.errorMessage : null,
                    onChange: (e, {newValue}) => {
                        onChange(newValue || e.target.value)

                    }
                }}
                theme={{
                    container: classes.container,
                    input: classes.input,
                    suggestionsContainerOpen: classes.suggestionsContainerOpen,
                    suggestionsList: classes.suggestionsList,
                    suggestion: classes.suggestion,
                }}
                renderSuggestionsContainer={options => (
                    <Paper {...options.containerProps} style={{maxHeight: 300, overflow: 'auto'}} square>
                        {options.children}
                    </Paper>
                )}
            />

        );
    }
}

IntegrationAutosuggest.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IntegrationAutosuggest);