$(document).ready(function () {

    var currentDeckNo = 0;


    function generateDeckCards(noOfDecks,data) {
        $('.deck-card-bunker').html('');
        for (let i = 0; i < noOfDecks; i++) {
            var originWords = ``;
            for (let j = 0; j < data[i].length; j++) {
                originWords += `<p class="card-text">${data[i][j].origin_word}</p>`;
            }
            $(".deck-card-bunker").append(`
                <li class="">.
                    <div class="card deck-bs-card" style="width: 80%;">
                        <div class="card-body">
                            <h2 class="deck-header">Deck ${i+1}</h2>
                            <hr class="deck-card-divider"></hr>
                            <h4 class="">Origin Words</h4>
                            ${originWords}
                            <a id=${i} class="btn btn-primary deck-btn">
                                <span class="deck-btn-txt">PRACTISE</span>
                            </a>
                        </div>
                    </div>
                </li>
            `);
        }
        console.log($(".deck-card-bunker").html())  ;
        $(".deck-btn").click(function() {
            alert("clicked deck card btn with id"+currentDeckNo);
        });
        $(".my-slider").cardslider({
            nav: false,
            swipe: true,
            dots: true,
            afterCardChange: function(index) {
            currentDeckNo = index + 1;
            console.log(currentDeckNo);
            }
        });
        var cardslider = $(".my-slider").data("cardslider");
        $(".prev").click(function() {
            // alert(cardslider._activeCard.index);
            cardslider.prevCard();
        });
        $(".next").click(function() {
            // alert(cardslider._activeCard.index);
            cardslider.nextCard();
        });

    }

    $.ajax({
      url: "backend/get_decks.php",
      type: "POST",
    //   data: {chapter:1},
      data: {chapter:localStorage.clicked_chapter},
      error: function(err) {
        console.log("in error");
        console.log(err);
      },
      success: function(data) {
        deck_data = JSON.parse(data);
        console.log("in success");
        if (data == "no_data") {
            console.log("no_data");
        //   showSnackbar();
        }
        else {
            console.log(data);
            var noOfDecks = parseInt(deck_data.noOfDecks);
            generateDeckCards(noOfDecks,deck_data.data);
        }
      }
    });

});