$(document).ready(function () {

    function emptyChapterCardsBunker() {
        $(".chapter-card-bunker").html('');
    }

    function generateChapterCards(noOfChapters) {
        for (let i = 1; i <= noOfChapters; i++) {
            $(".chapter-card-bunker").append(`
                <div class="col-sm-4 chapter-card-cont">
                    <div class="card chapter-card">
                        <img class="card-img-top chapter-card-img" src="images/chapter-icons/${i}.png" alt="Chapter card image">
                        <div class="card-body">
                            <h3 class="card-title chapter-title">Chapter ${i}</h5>
                            <p class="card-text">Practise decks in this chapter</p>
                            <a href="#" class="btn btn-primary chapter-btn col-sm-12">View decks</a>
                        </div>
                    </div>
                </div>
            `);
        }
    }

    emptyChapterCardsBunker();
    generateChapterCards(5);

    $('chapter-btn').click(function (e) {
        e.preventDefault();
    });
});