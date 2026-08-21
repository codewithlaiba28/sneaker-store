$files = git ls-files --others --exclude-standard
$filesArray = $files -split "`r`n" | Where-Object { $_ -ne "" }
if ($filesArray.Length -eq 0) {
    $filesArray = $files -split "`n" | Where-Object { $_ -ne "" }
}

$count = 0
foreach ($file in $filesArray) {
    if ($count -ge 39) { break } # 19 yesterday, 20 today

    Write-Host "Adding $file"
    git add "$file"
    
    $msg = "Add $file"
    
    if ($count -lt 19) {
        git commit -m $msg --date="yesterday"
    } else {
        git commit -m $msg
    }
    
    git push origin main
    
    $count++
}
