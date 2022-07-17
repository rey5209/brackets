

$(document).ready(function() {
 
    var current_page = 1;
    var max_page = 0;
    var page_main_tittles = [];
    var page_sub_tittles = [];

  


  // login first bago mmaka pasok !! 
    var  sess_ = validateCredentials()
    if(sess_ == null){
      document.location='login.html'
    }
    var json_name = sess_.json_name;
    // console.log(json_name)

    $('.admin_username').text(sess_.first_name+' '+sess_.last_name)

    // updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles)

    $('.btn-next').click(function() { 
        current_page ++;
        updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles)
    })
    $('.btn-prev').click(function() { 
        current_page --;
        updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles)
    })


  var unique = + new Date();
  // console.log(unique);

  fetch("js/"+json_name+"?ver="+unique)
    .then(response => {
      return response.json();
    })
    .then(function(data) {  
      var count_page=  1;
      // console.log(data.today);

      data.jsonData.forEach(setTables);
      // data.yesterday.forEach(setViewsYesteday); 

      function setPages(item, index) { 

      }

      function setTables(item, index) { 

        // Pagination setup
        max_page++;
        page_main_tittles.push(item.tittle);
        page_sub_tittles.push(item.subTittle);

        // Setup Table content for views per page

        var total = 0;
        // var tittle = item.tittle;
        $('.append_pages').append(""+ 
        '<table name="'+item.tittle+'" class="table table-striped table-hover table-paging table-page-'+count_page+'">'+
        '    <thead>'+
        '      <tr > '+
        '        <th  class="lokals-item d-flex justify-content-between align-items-center"> '+
        '          <div class="p-2 bd-highlight  ">District</div> '+
        '          <div class="p-2 bd-highlight   ">Views</div>'+
        '        </th> '+
        '      </tr>'+
        '    </thead>'+
        '    <tbody class="append_table-'+count_page+'">  '+
        '  </tbody>'+
        '</table>'+
        "")
        
 
        var page = item.page;
        var redirectPage = item.redirectPage;
        item.viewData.forEach(setLokals);
        function setLokals(item, index) { 
          total += item.views; 

          // Setup Lokal content and views for each page
          $('.append_table-'+count_page).append(""+
          '<tr class="search-lokal " data-search="' + (item.lokal.toLowerCase())+ '"> ' +
          '    <td > '+
          '        <a href="'+(redirectPage == true? page+'?pageId='+count_page+'&lokal='+item.lokal : '#' )+'" class="lokals-item d-flex justify-content-between align-items-center" id="lokal_'+item.lokal+'">'+
          '          <div class="p-2 link-dark post-title">'+item.lokal+'</div> '+
          '          <div class="p-2 link-dark view-counter '+item.lokal+'_view">'+item.views+'</div>'+
          '        </a>'+
          '    </td>  '+
          '  </tr>  '+
          "")
        }

        // Just for empty space
        $('.append_table-'+count_page).append(""+
        '<tr> '+ 
        '  <td >        '+
        '    <div class="lokals-item lokals-footer d-flex justify-content-between align-items-center">'+
        '      <h3 class="p-2 link-dark post-title text-danger"></h3> '+
        '      <h3 class="p-2 link-dark view-counter text-danger "></h3>'+
        '    </div> '+
        '  </td>  '+
        '</tr>'+
          "")

          // Get total at the end of every page
        $('.append_table-'+count_page).append(""+
        '<tr> '+
        '  <td >        '+
        '    <div class="lokals-item lokals-footer d-flex justify-content-between align-items-center">'+
        '      <h3 class="p-2 link-dark post-title text-danger">Total</h3> '+
        '      <h3 class="p-2 link-dark view-counter text-danger total_view">'+total+'</h3>'+
        '    </div> '+
        '  </td>  '+
        '</tr>'+
          "")

        count_page++;
      }
         
      updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles)

    }).catch(function(error) {
            console.log(error);
    });
    
    function updatePaging(current_page,max_page,page_main_tittles,page_sub_tittles){
        console.log(page_sub_tittles[0])
        $('.table-paging').hide()
        
        $('.table-page-'+current_page).show()

        $('.page-main-tittle').text(page_main_tittles[current_page-1])
        $('.page-tittle').text(''+page_sub_tittles[current_page-1])
        
        
        if(current_page <= 1){
            $('.btn-prev').hide()
        }else{ 
            $('.btn-prev').show()
        }

        if(current_page == max_page){
            $('.btn-next').hide()
        }else{ 
            $('.btn-next').show()
        }
    }
    
}) 

function parseURLParams(url) {
      var queryStart = url.indexOf("?") + 1,
          queryEnd   = url.indexOf("#") + 1 || url.length + 1,
          query = url.slice(queryStart, queryEnd - 1),
          pairs = query.replace(/\+/g, " ").split("&"),
          parms = {}, i, n, v, nv;
  
      if (query === url || query === "") return;
  
      for (i = 0; i < pairs.length; i++) {
          nv = pairs[i].split("=", 2);
          n = decodeURIComponent(nv[0]);
          v = decodeURIComponent(nv[1]);
  
          if (!parms.hasOwnProperty(n)) parms[n] = [];
          parms[n].push(nv.length === 2 ? v : null);
      }
      return parms;
  }
  

$('#search_lokal').on('keyup', function() {
  // $('.result-Australia East').hide()
  if (event.which == 13) {
    event.preventDefault();
  }

  search_keyword = $('#search_lokal').val()
  searchResults(search_keyword)
})


$('#search_lokal').on('change', function() {

  search_keyword = $('#search_lokal').val()
  searchResults(search_keyword)
  $('#search_lokal').trigger('keypress');
})

$('#search_lokal').on('keyup', function() {
  //code to be executed
}).on('keydown', function(e) {
  if (e.keyCode == 8)
    $('#search_lokal').trigger('keypress');
});

function searchResults(value) {

  if (value == '') {

    $(".search-lokal").show()
  } else {
    value = value.toLowerCase()

    $(".search-lokal").hide()
    
    // $( 'table[data-search]' ).filter(function(){
    //   return $(this).attr('data-search').toLowerCase()== value;
    // }).show()
    $("table").find("[data-search*='" + value + "']").show()
    console.log(value)
  }
}


$('.search-test').on('click', function() {
  //code to be executed
  search_keyword = $('#search_lokal').val()
  searchResults(search_keyword)
});


  function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd   = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.replace(/\+/g, " ").split("&"),
        parms = {}, i, n, v, nv;

    if (query === url || query === "") return;

    for (i = 0; i < pairs.length; i++) {
        nv = pairs[i].split("=", 2);
        n = decodeURIComponent(nv[0]);
        v = decodeURIComponent(nv[1]);

        if (!parms.hasOwnProperty(n)) parms[n] = [];
        parms[n].push(nv.length === 2 ? v : null);
    }
    return parms;
}



  function parseURLParams(url) {

    if(url != '' && url != null  )
    {
      var queryStart = url.indexOf("?") + 1,
          queryEnd   = url.indexOf("#") + 1 || url.length + 1,
          query = url.slice(queryStart, queryEnd - 1),
          pairs = query.replace(/\+/g, " ").split("&"),
          parms = {}, i, n, v, nv;
  
      if (query === url || query === "") return;
  
      for (i = 0; i < pairs.length; i++) {
          nv = pairs[i].split("=", 2);
          n = decodeURIComponent(nv[0]);
          v = decodeURIComponent(nv[1]);
  
          if (!parms.hasOwnProperty(n)) parms[n] = [];
          parms[n].push(nv.length === 2 ? v : null);
      }
      return parms;
    }else{
      return null;
    }
}

                  
  function validateCredentials(){
    
     var urlParams = parseURLParams(location.search);  
     var get_data = (urlParams != null ? urlParams.data[0] : null);

    
    var  sess_data = ( sessionStorage.getItem("login_credentials") ); 

    if(get_data !='' && get_data != null){ 
      
      var decrypted = CryptoJS.AES.decrypt( get_data.replace(/PLUS/g, "+") , "GALIT-AKO-SA-PINK!"); 
      var json_data = ( decrypted.toString(CryptoJS.enc.Utf8) ); 

      // save it to session (overwrite the old session), validated to view site without the URLParams next time
      sessionStorage.setItem("login_credentials", json_data);

      json_data =   JSON.parse( json_data );
      return json_data;

      
    }else if(sess_data !='' && sess_data != null){

      return JSON.parse( sess_data );
    }else{
      
      return null;
    }
  

  

    
}