<?php include('static/partials/header.php'); ?>

<?php include('static/partials/main-navigation.php'); ?>


<section class="banner main tff">

    <div class="banner-main-inner-wrapper">
    <div class="banner-main-inner-content">

        <div class="content-wrapper tight">

            <!--<img class="centerpiece" src="/assets/img/tff-logo.png" title="Tribeca Film Festival" alt="TFF Logo" />-->

        </div>

    </div>
    </div>

</section>


<section class="bg-black">
<div class="content-wrapper text bg-white">

    <div class="inkwell teal">
        <h2>
            Find the perfect spot <br class="hide-from-mobile">to enjoy VDKA 6100
        </h2>
    </div>

    <a href="http://facebook.com/VDKA6100" target="_blank">
        <img class="poster" src="/assets/img/eat-and-drink-guide.jpg" alt="Eat and Drink Guide" />
    </a>

    <!-- the map -->
    <div class="map-wrapper tribeca">
        <div id="map-canvas" class="tribeca"></div>
    </div>

    <div class="row">
        <div class="col-xs-12">

            <?php
                $root = $_SERVER['DOCUMENT_ROOT'];
                $json = file_get_contents( $root . '/assets/data/tribeca-locations.json' );
                $json = json_decode($json);
                $index = 1;
            ?>

            <!-- the table approach -->
            <table class="tribeca-locations">
                <?php foreach($json as $obj): ?>

                    <tr>
                        <td>
                            <span class="strong">
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
                        <td class="map">
                            <a href="<?php echo $obj->map_url; ?>" target="_blank" >
                                MAP
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

    <a href="http://facebook.com/VDKA6100" target="_blank">
        <img class="poster" src="/assets/img/meet-and-greet.jpg" alt="Enter to win a Meet and Greet with Robert DeNiro" />
    </a>

    <div class="inkwell teal">
        <h2>
            See what our fans are saying!
        </h2>
    </div>

    <div class="social-feed-wrapper">
        
        <!-- twitter -->
        <h2>TWITTER</h2>
        <div class="social-feed">
            <a class="twitter-timeline" href="https://twitter.com/VDKA6100" data-widget-id="585914868575920129">Tweets by @VDKA6100</a>
            <script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>
        </div>

        <!-- instagram -->
        <h2>INSTAGRAM</h2>
        <iframe src="http://snapwidget.com/in/?h=dmRrYTYxMDB8aW58MTIwfDR8NHx8bm98NXxub25lfG9uU3RhcnR8eWVzfG5v&ve=080415" title="Instagram Widget" class="snapwidget-widget" allowTransparency="true" frameborder="0" scrolling="no" style="border:none; overflow:hidden; width:500px; height:500px"></iframe>

        <!-- facebook -->
        <h2>FACEBOOK</h2>
        <div class="social-feed">
            <iframe src="http://www.facebook.com/plugins/likebox.php?href=http%3A%2F%2Fwww.facebook.com%2Fvdka6100&amp;width=490&amp;colorscheme=light&amp;show_faces=true&amp;border_color&amp;stream=true&amp;header=true&amp;height=450" scrolling="yes" frameborder="0" style="border:none; overflow:hidden; width:490px; height:450px; background: white; float:left; " allowTransparency="true"></iframe>
        </div>

    </div>

</div>
</section>

<?php include('static/partials/footer.php'); ?>

