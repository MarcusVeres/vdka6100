<?php include('static/partials/header.php'); ?>

<section class="uber">

    <div class="display-table" style="height: 90%">

        <img class="logo home" src="/assets/img/logo.png" />

        <div class="display-row age-verification">
            <div class="display-cell">

                <h2 class="tagline wide">
                    Confirm your age to enter
                </h2>

                <div class="inline">
                    <button id="over-21" class="btn line">
                        Over 21
                    </button>
                    <button id="under-21" class="btn line">
                        Under 21
                    </button>
                </div>

                <div class="checkbox">
                    <label><input id="remember-me" type="checkbox" value="">Remember Me</label>
                </div>

            </div>
            <div class="display-cell hide-from-mobile" style="width: 40%">
                <div class="index-bottle-wrapper">
                    <img class="index-bottle" src="/assets/img/bottle.png" />
                    <div class="index-bottle-underline"></div>
                </div>
            </div>
        </div>

        <div class="display-row top-center-row">
            <div class="display-cell hide-from-desktop top-center-cell">
                <div class="index-bottle-wrapper">
                    <img class="index-bottle" src="/assets/img/bottle.png" />
                    <div class="index-bottle-underline"></div>
                </div>
            </div>
        </div>

    </div>

    <div class="display-table" style="height: 8%">
        <div class="display-row" style="width: auto; border-top: 1px solid gray;">
            <div class="display-cell agreement-wrapper">

                <div class="implicit-agreement">
                    <p class="fine-print">
                        By entering this site you agree to our
                        <a href="/terms">
                            Terms and Conditions
                        </a>
                        and
                        <a href="/privacy">
                            Privacy Policy
                        </a>.
                    </p>
                </div>

            </div>
        </div>
    </div>

</section>


<!-- custom -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<script src="//cdn.datatables.net/1.10.7/js/jquery.dataTables.min.js"></script>
<script src="//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?v=3&key=AIzaSyAdVeDCpF1gDswiV6rRNJF7Ibqi6aJAtvs&sensor=false"></script>
<script src="/lib/markerclusterer_compiled.js"></script>

<!-- scripts -->
<script src="static/js/scripts.js"></script>
<script src="static/js/formatter.js"></script>

<!-- analytics -->
<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-62346902-1', 'auto');
    ga('send', 'pageview');
</script>


</body>
</html>

