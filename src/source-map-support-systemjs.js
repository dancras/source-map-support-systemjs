var SystemJSLoader = require('systemjs').constructor,
    sourceMapSupport = require('source-map-support'),
    systemTranslate = SystemJSLoader.prototype.translate,
    sourceMaps = {};

SystemJSLoader.prototype.translate = function (load) {

    var out = systemTranslate.call(this, load);

    out.then(function (compiled) {

        var lines,
            dataUrl,
            sourceMapBuffer;

        if (load.metadata.format !== 'esm') {
            return;
        }

        lines = compiled.split('\n');
        dataUrl = lines[lines.length - 3].replace('//# sourceMappingURL=', '');
        sourceMapBuffer = new Buffer(dataUrl.split(',')[1], 'base64');

        sourceMaps[load.name] = sourceMapBuffer.toString();

    });

    return out;
};

module.exports = Object.create(sourceMapSupport);

module.exports.install = function (config) {

    config = config || {};

    config.retrieveSourceMap = function (source) {

        if (sourceMaps[source]) {

            return {
                url: source,
                map: sourceMaps[source]
            };

        }

    };

    sourceMapSupport.install(config);

};
