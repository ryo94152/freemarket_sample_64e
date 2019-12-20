$(document).on("turbolinks:load",function() {

  function buildHTML(imgSrc){
    let html =  `<div class="preview-box">
                   <div class="preview-box__img-box">
                     <input type="image" src="${imgSrc}" name="images[image][]" id="iamges_image_ids_${imgSrc}>
                  </div>
                  <div class="preview-box__select">
                  <div class="preview-box__select__delete">
                    <p>削除</p>
                  </div>
                </div>
              </div>`

              // let html =  `<input type="file"  name="images[image][]" >`
    $('.single-main__box__sell__inner__form__upload__items').prepend(html);
  };

  let images = [];

  $('#upload-image').change(function(e){
    let files = e.target.files;
    for (var i = 0, f; f = files[i]; i++){
      let reader = new FileReader();
      reader.readAsDataURL(f);
      reader.onload = function(){
        let imgSrc = reader.result;
        buildHTML(imgSrc);
        images.push(imgSrc);
    }
    }
  });

  $('.single-main__box__sell__inner__form__upload__items__input').on('drop', function(e) {
    e.preventDefault();
    e.stopPropagation();
    let dropImages = e.originalEvent.dataTransfer.files;
      for(let i = 0; i < dropImages.length; i++ ) {
        let imgSrc = URL.createObjectURL(dropImages[i]);
        buildHTML(imgSrc);
        images.push(dropImages[i].name);
      }
  });

  $(document).on('click', '.preview-box__select__delete p', function(){
    $(this).closest('.preview-box').remove();
  });

  // ネスト構造のセレクトボックスの段階表示
  function appendOption(select){
  let html = `<option value="${select.id}">${select.genre}</option>`
  return html;
  }
  
  function childBox(insertHTML){
  let childBoxHTML =`<div class="select-wrap" id="child_box">
                      <i class="icon-arrow-bottom"></i>
                      <select class="select-default" id="child_form" name="product[category_id]">
                        <option value="">---</option>
                        ${insertHTML}
                    </select>
                    </div>`
  $("#parent_box").after(childBoxHTML);
  }
  
  function grandChildBox(insertHTML){
  let grandChildBoxHTML =`<div class="select-wrap" id="grandchild_box">
                            <i class="icon-arrow-bottom"></i>
                            <select class="select-default" id="grandchild_form" name="product[category_id]">
                              <option value="">---</option>
                              ${insertHTML}
                            </select>
                          </div>`
  $("#child_box").after(grandChildBoxHTML);
  }

  clothesArray       = ["160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180",
                        "181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201",
                        "202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","230","231","232",
                        "317","318","319","340","341","342","343","344","345","346","347","348","349","350","351","352","353","354","355","356","357",
                        "358","359","360","361","362","363","364","365","366","367","368","369","370","371","372","373","374","375","376","377","378",
                        "379","380","381","382","383","404","405","406","407","408","459","460","467","468","469","1087","1088","1098","1099"]

  ladiesShoesArray   = ["220","221","222","223","224","225","226","227","228","229","1085","1095"]

  mensShoesArray     = ["384","385","386","387","388","389","390","391","1084","1094"]

  babiesClothesArray = ["471","472","473","474","475","476","477","478","479","480","481","482","483","484",
                        "485","486","487","488","489","490","491","492","493","494","495","496","497"]

  kidsClothesArray   = ["498","499","500","501","502","503","504","505","506","507","508","509","510","511","512","513","514","515","516","517",
                        "518","519","520","521","522","523","524","525","526","527","528","529","530","531","532","533","534","1089","1100"]

  kidsShoesArray     = ["535","536","537","538","539","1086","1096"]

  lensArray          = ["978","979"]

  tvsArray           = ["983"]

  snowboardsArray    = ["1082"]

  skiingboardsArray  = ["1093"]

  tiresArray         = ["1222","1223","1224","1225"]

  motorcyclesArray   = ["1252"]

  helmetsArray       = ["1269"]


  $(function() {
    $("#parent_form").on('change', function(){
      let parentValue = $(this).val();
      if(parentValue != ""){
        $.ajax({
          url: "/products/get_child_category",
          type: "GET",
          data: {
            parent_id: parentValue
          },
          dataType: "json"
        })
        .done(function(childs){
          $("#child_box").remove();
          $("#grandchild_box").remove();
          $("#size-select-box").hide();
          let insertHTML = "";
          childs.forEach(function(child){
            insertHTML += appendOption(child);
          });
          childBox(insertHTML);
        })
        .fail(function(){
          alert("カテゴリー取得に失敗しました");
        })
      } else {
        $("#child_box").remove();
        $("#grandchild_box").remove();
        $("#size-select-box").hide();
      }
    })
  })
  
  $(function() {
    $("#category-select-box_list").on('change', "#child_form", function(){
      let childValue = $("#child_form").val();
      if(childValue != ""){
        $.ajax({
          url: "/products/get_grandchild_category",
          type: "GET",
          data: {
            child_id: childValue
          },
          dataType: "json"
        })
        .done(function(grandchilds){
          $("#grandchild_box").remove();
          $("#size-select-box").hide()
          let insertHTML = "";
          grandchilds.forEach(function(grandchild){
            insertHTML += appendOption(grandchild);
          });
          grandChildBox(insertHTML);
        })
        .fail(function(){
          alert("カテゴリー取得に失敗しました");
        })
      } else {
        $("#grandchild_box").remove();
        $("#size-select-box").hide()
      }
    })
  })

  $(function() {
    $("#category-select-box_list").on('change', "#grandchild_form", function(){
      let grandChildValue = $("#grandchild_form").val();
      if(grandChildValue != ""){
        if(clothesArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#clothes-size").siblings().hide();
          $("#clothes-size").show()
        }else if(ladiesShoesArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#ladies-shoes-size").siblings().hide();
          $("#ladies-shoes-size").show();
        }else if(mensShoesArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#mens-shoes-size").siblings().hide();
          $("#mens-shoes-size").show();
        }else if(babiesClothesArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#babies-clothes-size").siblings().hide();
          $("#babies-clothes-size").show();
        }else if(kidsClothesArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#kids-clothes-size").siblings().hide();
          $("#kids-clothes-size").show();
        }else if(kidsShoesArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#kids-shoes-size").siblings().hide();
          $("#kids-shoes-size").show();
        }else if(lensArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#lens-size").siblings().hide();
          $("#lens-size").show();
        }else if(tvsArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#tvs-size").siblings().hide();
          $("#tvs-size").show();
        }else if(snowboardsArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#snowboards-size").siblings().hide();
          $("#snowboards-size").show();
        }else if(skiingboardsArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#skiingboards-size").siblings().hide();
          $("#skiingboards-size").show();
        }else if(tiresArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#tires-size").siblings().hide();
          $("#tires-size").show();
        }else if(motorcyclesArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#motorcycles-size").siblings().hide();
          $("#motorcycles-size").show();
        }else if(helmetsArray.indexOf(grandChildValue) >= 0) {
          $("#size-select-box").show();
          $("#helmets-size").siblings().hide();
          $("#helmets-size").show();
        }else {
          $("#size-select-box").hide();
        }
      } else {
        $("#size-select-box").hide();
      }
    })
  })

  $(function() {
    $("#size-select-box").find("select").on('change', function(){
      $("#size-select-box").find("select").attr("name", "item[hoge]")
      $(this).attr("name","item[size]")
    })
  })

  // 価格の手数料と利益の非同期
  function priceView(){
    let price = $("#product_price").val();
    let minPrice = 300
    let maxPrice = 9999999
    let fee = 10
    let tax = Math.floor(price / fee)
    let profit = price - tax
    let kanmaProfit = profit.toLocaleString()
    if(price >= minPrice && price <= maxPrice){
        $("#tax-text").text("¥" + tax.toLocaleString());
        $("#profit-text").text("¥" + kanmaProfit);
        $("#item-submit").show();
        $("#item-no-submit").hide();
        $("#price-attention").hide();
      } else {
        $("#tax-text").text("ー");
        $("#profit-text").text("ー");
        $("#item-submit").hide();
        $("#item-no-submit").show();
        $("#price-attention").show();
      }
    }
  
  $(function(){
    $("#product_price").on('input',function(){
      priceView()
    })
    if(document.URL.match("products" && "edit")){
      priceView()
    }
  })
  
});
