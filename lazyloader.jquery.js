(function ($) {
    $.fn.lazyLoad = function (threshold, callback) {

        var win = $(window),
            threshold = threshold || 0,
            pxDensity = window.devicePixelRatio > 1,
            imgSrc = pxDensity ? "data-src-retina" : "data-src",
            images = this,
            inView;

        this.one("lazyLoad", function () {
            var source = this.getAttribute(imgSrc);
            source = source || this.getAttribute("data-src");

            if (source) {
                this.setAttribute("src", source);
                if (typeof callback === "function") callback.call(this);
            }
        });

        function lazyLoad() {
            x = 1;
            var inview = images.filter(function () {
                var el = $(this);
                if (el.is(":hidden")) return;

                var position = win.scrollTop(),
                    height = position + win.height(),
                    offset = el.offset().top,
                    imageBottom = offset + el.height();

                x++;
                return imageBottom >= position - threshold && offset <= height + threshold;
            });

            inView = inview.trigger("lazyLoad");
            images = images.not(inView);
        }

        win.on("scroll resize", lazyLoad);
        lazyLoad();
        return this;
    };
})(window.jQuery);
