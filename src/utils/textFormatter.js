export const musicEmbed = (title, Duration, Artist, User, thumbnail, URL) => {
    const embeds = [
        {
            "type": "rich",
            "title": `Playing : ${title}`,
            "description": `Duration: ${Duration} | Artist: ${Artist}`,
            "color": 0x8df4f4,
            "fields": [
                {
                    "name": `Request by`,
                    "value": User,
                    "inline": true
                }
            ],
            "thumbnail": {
                "url": thumbnail,
                "height": 0,
                "width": 0
            },
            "url": URL
        }
    ];

    return embeds

}

export const musicButton = (prevDsbl, nextDsbl) => {
    const components = [{
        "type": 1,
        "components": [
            {
                "style": 1,
                "label": `<`,
                "custom_id": `row_0_button_prevPg`,
                "disabled": prevDsbl,
                "type": 2
            },
            {
                "style": 1,
                "label": `>`,
                "custom_id": `row_0_button_nextPg`,
                "disabled": nextDsbl,
                "type": 2
            }
        ]
    }]
    return components;
}