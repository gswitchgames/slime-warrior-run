!function () {
    function _assertThisInitialized(self) {
        if (self === void 0) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return self;
    }

    //console.log("+++++++++++++++++++++++++++++++++assertThisInitialized+++++++++++++++++++++++++++++++++++++++++++");
    module._assertThisInitialized = _assertThisInitialized;
    //console.log(module);
    //console.log("=================================assertThisInitialized============================================");
}();
