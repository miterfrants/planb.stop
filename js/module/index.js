define(function () {
  return {
    galleryTimer:0,
    numLoadedImg:1,
    galleryPeriod:6000,
    onReady: function () {
      $(".menu>li").click(this.changeDesc);
      $(".menu>li:eq(0)").addClass("active");
      $(".gallery-switch>li").bind("click",$.proxy(function(e){
          clearTimeout(this.galleryTimer);
          $(".gallery").css({"transition-duration":"0.26s","-webkit-transition-duration":"0.26s"});
          this.switchGallery(e);
          setTimeout($.proxy(function(){
              this.turnOnImageSlider();
          },this),260);
      },this));
      $(".gallery-switch>li").bind("auto-slide",$.proxy(function(e){
          $(".gallery").css({"transition-duration":"2.0s","-webkit-transition-duration":"2.0s"});
          this.switchGallery(e);
      },this));
      $(".desc-nav").css("height",$(".menu").height());
      this.checkScreen();
      $(window).bind("resize",$.proxy(function(e){
        this.checkScreen();    
      },this));
    },
    checkScreen:function(){
      if($(window).height()<800){
          if($(window).width()>700){
            $(".content").addClass("sm");
            $(".menu>li.active").trigger("click");
            return;
          }
      }
      $(".switch-outer").css("left","50%");
      $(".content").removeClass("sm");
      $(".menu>li.active").trigger("click");
    },
    onLoad:function(){
        //load woff
        //這個好像放在CSS比較好
        //$("head").append("<style>@import url(http://fonts.googleapis.com/css?family=Roboto:300)</style>");
        //first picture loaded
        $(".gallery-switch>li:eq(0)").addClass("loading");
        $(".gallery").css("opacity","0");
        this.loadImg();
    },
    loadImg:function(){
        setTimeout($.proxy(function(){$("<img src=\""+$(".gallery-switch>li:eq(0)").data("img")+"\" />").load($.proxy(function(){
            $(".gallery-switch>li:eq(0)").removeClass("loading");
            $(".gallery-switch>li:eq(0)").addClass("active");
            $(".gallery-switch>li:eq(0)").attr("data-loaded","true");
            $(".gallery").css("background","url("+$(".gallery-switch>li:eq(0)").data("img")+") center no-repeat");
            $(".gallery").animate({opacity:1},260)
            //load other picture
            $(".gallery-switch>li:gt(0)").each($.proxy(function(i){
                $("<img src=\""+$(".gallery-switch>li:eq("+i+")").data("img")+"\" />").load($.proxy(function(){
                    $(".gallery-switch>li:eq("+i+")").attr("data-loaded","true");
                    this.numLoadedImg+=1;
                    //check image total loaded
                    if(this.numLoadedImg==$(".gallery-switch>li").length){
                        this.turnOnImageSlider();
                    }
                },this));
            },this));
        },this));},this),0);
    },
    turnOnImageSlider:function(){
        this.galleryTimer=setTimeout($.proxy(function(){
            this.slideImg();
        },this),this.galleryPeriod);
    },
    slideImg:function(){
        var i=$(".gallery-switch>li.active").index();
        var len=$(".gallery-switch>li").length;
        if(i>=len-1){
            i=-1;
        }
        $(".gallery-switch>li:eq("+(i+1)+")").trigger("auto-slide");
        this.galleryTimer=setTimeout($.proxy(function(){
            this.slideImg();
        },this),this.galleryPeriod);
    },
    changeDesc:function(e){
        $(".desc").css("opacity",0);
        $(".menu>li").removeClass("active");
        $(e.currentTarget).addClass("active");
        $("."+$(e.currentTarget).data("type")).css("opacity",1);
        var index=$(e.currentTarget).index();
        if($(".content").hasClass("sm")){
           $(".active-bar").css("top",($(e.currentTarget).position().top-7)+"px");
          
        }else{
            $(".active-bar").css("top",$(e.currentTarget).position().top+"px");
        }
         $(".desc-nav .btn:eq("+index+")").css("top",$(".desc-nav dl:eq("+index+")").outerHeight(true)+20);
        //$(".btn-"+$(e.currentTarget).data("type")).css({"top":($(".desc-nav>.desc:eq("+index+")").outerHeight(true)+25)+"px","opacity":"1"});
    },
    switchGallery:function(e){
        if(!$(".gallery-switch>li:eq(0)").data("loaded")){
            return;
        }
        $(".gallery-switch>li").removeClass("active");
        if($(e.currentTarget).data("loaded")){
            $(e.currentTarget).addClass("active");
            $(".gallery").css("background","url("+$(e.currentTarget).data("img")+") center no-repeat");
        }else{
            $(e.currentTarget).addClass("loading");
            $("<img src=\""+$(e.currentTarget).data("img")+"\" />").load(function(){
                $(e.currentTarget).attr("data-loaded","true");
                $(e.currentTarget).removeClass("loading");
                $(e.currentTarget).addClass("active");
                $(".gallery").css("background","url("+$(e.currentTarget).data("img")+") center no-repeat");
            })
        }
    }
  }
});