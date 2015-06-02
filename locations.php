<?php include('static/partials/header.php'); ?>

<?php include('static/partials/main-navigation.php'); ?>


<section class="banner main rdn">

    <!-- the map -->
    <div class="map-wrapper">
        <div id="map-canvas" class="stores"></div>
    </div>

</section>


<section class="bg-black">
<div class="content-wrapper text bg-white">

    <div class="row">
        <div class="col-xs-12">

            <?php
                $root = $_SERVER['DOCUMENT_ROOT'];
                $json = file_get_contents( $root . '/assets/data/store-locations.json' );
                $json = json_decode($json);
                $index = 1;
            ?>

            <!-- the table approach -->
            <table class="locations">
                <?php foreach($json as $obj): ?>

                    <tr>
                        <td>
                            <span class="strong">
                                <?php echo $index; ?>. 
                                <?php echo $obj->customer; ?>
                            </span>
                        </td>
                        <td>
                            <?php echo $obj->pretty_address; ?>
                        </td>
                        <td class="hide-from-mobile">
                            <a href="tel:<? echo $obj->phone; ?>">
                                <?php echo $obj->phone; ?>
                            </a>
                        </td>
                        <td class="phone-icon hide-from-desktop">
                            <a href="tel:<? echo $obj->phone; ?>">
                                <i class="fa fa-fw fa-phone"></i>
                            </a>
                        </td>
                    </tr>

                <?php $index++; ?>

                <?php endforeach; ?>
            </table>
            <!-- the table approach -->


            <!-- the list approach -->
            <!--
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
            -->
            <!-- the list approach -->

        </div>
    </div>

</div>
</section>

<?php include('static/partials/footer.php'); ?>

