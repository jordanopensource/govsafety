/**
 * Created by salalem on 06/08/18.
 //  */
const webpack = require('webpack');

module.exports = {

    webpack: (config) => {
        // Note: we provide webpack above so you should not `require` it
        // Perform customizations to webpack config
        // Important: return the modified config
        config.plugins.push(new webpack.IgnorePlugin(/jsdom$/))
        return config
    },

};