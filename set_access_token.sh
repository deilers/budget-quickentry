if [[ -n "$ACCESS_TOKEN" ]]; then
    touch token.json
    echo $ACCESS_TOKEN >> token.json
    cat token.json
fi
