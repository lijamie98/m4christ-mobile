/**
 * Created by Samuel on 1/29/2016.
 */

$(function() {
    $('.slider').on('mousedown touchstart', function(e) {

        var $slider = $(this);
        var $progress = $('.slider-progress', $slider);
        var $document = $(document);

        var offsetLeft = $(this).offset().left;
        var sliderWidth = $slider.width();

        $('.slider-progress-circle', $progress).addClass('pressed');

        moveCircle(e);

        function moveCircle(e) {
            e.preventDefault();
            var widthValue = ((e.clientX || e.originalEvent.touches[0].clientX) - 16) / sliderWidth * 100;
            $progress.css('width', widthValue + '%');
        }

        $document.on('mousemove touchmove', function(e) {
            moveCircle(e);
        });

        $document.one('mouseup touchend', function(e) {
            moveCircle(e);
            DOY();
            $('.slider-progress-circle', $progress).removeClass('pressed');
            $document.off('mousemove touchend');
        });
    });

    function DOY(doy) {
        if (doy != null)
            console.log('[DOY]', doy);
        else
            console.log('[DOY] DOY');
    }
});