// // Set default (primary) background image for all div.img
// function setBackgroundImage() {
// 	var length = $('.img').length;
// 	var img, bg;
// 	for(var i = 0; i < length; i++) {
// 		img = $('.img')[i];
// 		bg = $(img).attr('data-primary');
// 		setBackground(img, bg);
// 	}
// }

// // Fade the background by setting opacity 0, change the background source image,
// // and then setting opacity back to 1
// function fadeBackground(container, background) {
// 	$(container).fadeTo(250, 0, function() {
// 		setBackground(container, background);
// 		$(container).fadeTo(250, 1);
// 	});
// }

// // Change the background source image to a new source
// function setBackground(container, background) {
// 	$(container).css('background-image', 'url("/img/portfolio/' + background + '")');	
// }

// Set default (primary) background image for all div.img
function setBackgroundImage() {
	var imgs = document.querySelectorAll('.img');
	var img, bg;
	for(var i = 0; i < imgs.length; i++) {
		img = imgs[i];
		bg = img.getAttribute('data-primary');
		setBackground(img, bg);
	}
}

// Fade the background by setting opacity 0, change the background source image,
// and then setting opacity back to 1
function fadeBackground(container, background) {
	toggleFade(container, 1, 0, 500, background);
}

function toggleFade(container, start, end, duration, background) {
	var range = end - start;
	var goingUp = end > start;
	var steps = duration / 50; 
	var increment = range / steps;
	var current = start;
	var more = true;
	function next() {
		current = current + increment;
		if (goingUp) {
			if (current > end) {
				current = end;
				more = false;
			}
		} else {
			if (current < end) {
				current = end;
				more = false;
			}
		}
		container.style.opacity = current;
		
		if (more) {
			setTimeout(next, 20);
		}
	}
	next();

	if(!goingUp) {
		setBackground(container, background);
		toggleFade(container, 0, 1, 500);
	}
}

// Change the background source image to a new source
function setBackground(container, background) {
	container.style.backgroundImage = 'url("/img/portfolio/' + background + '")';
}