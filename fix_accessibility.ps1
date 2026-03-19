Get-ChildItem -Filter *.html | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    $c = $c -replace '<a href=\"#\"><i class=\"fa-solid fa-magnifying-glass\"></i></a>', '<a href=\"#\" aria-label=\"Search\"><i class=\"fa-solid fa-magnifying-glass\"></i></a>'
    $c = $c -replace '<a href=\"#\"><i class=\"fa-brands fa-facebook-f\"></i></a>', '<a href=\"#\" aria-label=\"Facebook\"><i class=\"fa-brands fa-facebook-f\"></i></a>'
    $c = $c -replace '<a href=\"#\"><i class=\"fa-brands fa-twitter\"></i></a>', '<a href=\"#\" aria-label=\"Twitter\"><i class=\"fa-brands fa-twitter\"></i></a>'
    $c = $c -replace '<a href=\"#\"><i class=\"fa-brands fa-linkedin-in\"></i></a>', '<a href=\"#\" aria-label=\"LinkedIn\"><i class=\"fa-brands fa-linkedin-in\"></i></a>'
    $c = $c -replace '<a href=\"#\"><i class=\"fa-brands fa-instagram\"></i></a>', '<a href=\"#\" aria-label=\"Instagram\"><i class=\"fa-brands fa-instagram\"></i></a>'
    $c = $c -replace 'backdrop-filter: blur\(8px\);', "-webkit-backdrop-filter: blur(8px);`r`n        backdrop-filter: blur(8px);"
    $c = $c -replace '<i class=\"fa-solid fa-chevron-down\" style=\"font-size: 10px; margin-left: 5px;\"></i>', '<i class=\"fa-solid fa-chevron-down nav-chevron\"></i>'
    $c = $c -replace '<i class=\"fa-solid fa-chevron-down\" style=\"font-size: 10px; margin-left: 5px\"></i>', '<i class=\"fa-solid fa-chevron-down nav-chevron\"></i>'
    $c | Set-Content $_.FullName
}
