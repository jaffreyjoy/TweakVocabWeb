$(document).ready(function () {

    function emptyChapterCardsBunker() {
        $(".chapter-card-bunker").html('');
    }

    // function clicked_chapter_btn(e){
    //     alert("clicked chapter card btn");
    // }

    function generateChapterCards(noOfChapters) {
        for (let i = 1; i <= noOfChapters; i++) {
            $(".chapter-card-bunker").append(`
                <div class="col-sm-4 chapter-card-cont">
                    <div class="card chapter-card">
                        <img class="card-img-top chapter-card-img" src="images/chapter-icons/${i}.png" alt="Chapter card image">
                        <hr class="card-divider">
                        <div class="card-body">
                            <h3 class="card-title chapter-title">Chapter ${i}</h5>
                            <p class="card-text">Practise decks in this chapter</p>
                            <a id=${i} class="btn btn-primary col-sm-12 chapter-btn"><span class="chapter-btn-txt">View decks</span></a>
                        </div>
                    </div>
                </div>
            `);
        }
        $(".chapter-btn").click(function() {
            alert("clicked chapter card btn");
        });
    }

    // emptyChapterCardsBunker();
    $.ajax({
      url: "backend/get_chapters.php",
      type: "POST",
      data: {},
      error: function(err) {
        console.log("in error");
        console.log(err);
      },
      success: function(data) {
        data = JSON.parse(data);
        console.log("in success");
        if (data.noOfChapters == "no_data") {
            console.log("no_data");
        //   showSnackbar();
        }
        else {
            var noOfChapters = parseInt(data.noOfChapters);
            generateChapterCards(noOfChapters);
        }
      }
    });

});