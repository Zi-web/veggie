$(function(){

	$(".tabs").on("click", ".tabs__item", function(){

		var tabs = $(".tabs__item"),
		    cont = $(".tabs__post");

		// Удаляем классы active
		tabs.removeClass("active");
		cont.removeClass("active");
		// Добавляем классы active
		$(this).addClass("active");
		cont.eq($(this).index()).addClass("active");

		return false;
	});
});

