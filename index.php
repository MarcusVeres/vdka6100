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

</body>
</html>

