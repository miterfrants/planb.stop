define(function () {
  return {
      
    popupTimer:1,
    popupLogin:function(){
      var pop="<div class=\"tri-angle\"></div><ul class=\"popup-login\"><li class=\"icon-circle-fb btn\"></li><li class=\"icon-circle-google btn\"></li><li class=\"icon-circle-twitter btn\"></li></ul>";
      $(".member-nav").addClass("active")
      $(".member-nav").append(pop);
      $(".popup-login").mouseout($.proxy(function(e){
          this.popupTimer=setTimeout($.proxy(function(){this.hidePopupLogin()},this),700);
      },this))
      $(".popup-login").mouseover($.proxy(function(e){
          clearTimeout(this.popupTimer);
      },this))
    },
    hidePopupLogin:function(){
        $(".popup-login").remove();
        $(".tri-angle").remove();
        $(".member-nav").removeClass("active");
    },
    onReady: function () {
      $(".member-nav").click($.proxy(function(e){
          this.popupLogin();
      },this))
    },
    onLoad:function(){
    }
  }
});