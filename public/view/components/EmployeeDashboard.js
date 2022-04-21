export default {
    template: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="public/stylesheet.css">

    
    </head>
    <body>
    <div class="row mt-2">
        <div class="col-md-12">
            <div class="card dashboard-body">
                <div class="container">

                <div class="header">
                    <a href="/" style="font-size: 12px;">DASHBOARD</a>
                </div>
                <div class="header-r">
                    
                </div>

                <div class="navigation" style="border-right: 1px solid #000;">
                    
                <div class='bar'>View Report</div>
                <br>
                <a href="/ride_frequency">Ride Frequency</a></br></br>
                <a href="/rainouts">Rainouts</a></br></br>

                
                <div class='bar'>Add Report</div>
                <br>
                <a href="/report_admission">Daily Admission</a></br></br>
                <a href="/report_ridden_ride">Rides</a></br></br>
                <a href="/report_maintenance">Maintenance</a></br></br>
                <a href="/report_rainout">Rainouts </a>

                </div>

                <div class="content">
                    <img src="../img/map1.png" alt="Roller Coaster" class='image'>            
                </div>

                <div class="footer"></div>
            </div>            
        </div>
    </div>
    </body>
</html>`,

    
}
