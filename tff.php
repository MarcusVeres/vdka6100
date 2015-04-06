<?php include('static/partials/header.php'); ?>

<?php include('static/partials/main-navigation.php'); ?>


<section class="banner main tff">

    <div class="banner-main-inner-wrapper">
    <div class="banner-main-inner-content">

        <div class="content-wrapper tight">

            <img class="centerpiece" src="/assets/img/tff-logo.png" title="Tribeca Film Festival" alt="TFF Logo" />

        </div>

    </div>
    </div>

</section>


<section class="bg-black">
<div class="content-wrapper text bg-off-white">

    <div class="inkwell teal">
        <h2>
            Find the perfect spot to enjoy VDKA 6100
        </h2>
    </div>

    <div class="row">
        <div class="col-xs-12">

            <?php
                $root = $_SERVER['DOCUMENT_ROOT'];
                $json = file_get_contents( $root . '/assets/data/locations.json' );
                $json = json_decode($json);
            ?>

            <ul class="locations">

                <?php foreach($json as $obj): ?>

                    <li>
                        <span class="strong">
                            <?php echo $obj->name; ?>
                        </span> | 
                        <span>
                            <?php echo $obj->address; ?>
                        </span> | 
                        <span>
                            <?php echo $obj->tel; ?>
                        </span> | 
                        <span class="map">
                            <a href="<?php echo $obj->map_url; ?>" target="_blank" >
                                MAP
                            </a>
                        </span>
                    </li>

                <?php endforeach; ?>

            </ul>

        </div>
    </div>

    <div class="inkwell teal">
        <h2>
            Enter our sweepstakes!
        </h2>
    </div>

    <img class="poster" src="/assets/img/tff-sweepstakes.jpg" alt="TFF Sweepstakes" />

    <div class="inkwell teal">
        <h2>
            See what our fans are saying!
        </h2>
    </div>

</div>
</section>

<?php include('static/partials/footer.php'); ?>

