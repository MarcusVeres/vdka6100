<?php include('static/partials/header.php'); ?>

<?php include('static/partials/main-navigation.php'); ?>


<section class="banner main map">

    <!-- the map -->
    <div class="map-wrapper">
        <div id="map-canvas" class="stores"></div>
    </div>

</section>


<section class="">
<div class="content-wrapper">

    <div class="row">
        <div class="col-xs-6">
            <button id="get-location" class="btn btn-default form-control">
                Use My Location
            </button>
        </div>
        <div class="col-xs-6">
            <div class="input-group">
                <input id="input-zip" class="form-control" type="text" placeholder="ZIP Code">
                <span class="input-group-btn">
                    <button id="get-zip" class="btn btn-default" type="button">Find</button>
                </span>
            </div>
        </div>
    </div>

</div>
</section>


<section class="bg-white">
<div class="content-wrapper padded bg-white">

    <div class="row">
        <div class="col-xs-12">

            <?php
                $root = $_SERVER['DOCUMENT_ROOT'];
                $json = file_get_contents( $root . '/assets/data/store-locations.json' );
                $json = json_decode($json);
            ?>

            <table id="store-locations-table" class="store-locations">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>

                    <?php foreach($json as $obj): ?>
                    <tr>
                        <td>
                            <span class="strong">
                                <?php echo $obj->customer; ?>
                            </span>
                        </td>
                        <td>
                            <?php 
                                if( isset( $obj->pretty_address )){
                                    echo $obj->pretty_address; 
                                }
                            ?>
                        </td>
                        <td class="phone-number">
                            <a href="tel:<? echo $obj->phone; ?>">
                                <?php echo $obj->phone; ?>
                            </a>
                        </td>
                    </tr>
                    <?php endforeach; ?>

                </tbody>
            </table>

        </div>
    </div>

</div>
</section>

<?php include('static/partials/footer.php'); ?>

