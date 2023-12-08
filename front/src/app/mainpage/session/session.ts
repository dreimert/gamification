export interface Session {
    Name: string,
    Date: string,
    Debut: string,
    Fin: string,
    state: string,
    imgpath: string,
}

export const sessions: Session[] = [
    {
        Name: "TP Kafka TRO G1",
        Date: "07/12/2023",
        Debut: "10:10",
        Fin: "12:00",
        state: "en cours",
        imgpath: "/assets/imgJoin/Kafka.png",
    },
    {
        Name: "TP Scraping TRO G1",
        Date: "01/01/2023",
        Debut: "00:00",
        Fin: "24:00",
        state: "Terminée",
        imgpath: "/assets/imgJoin/Scrapping.png",
    },
    {
        Name: "TP2",
        Date: "01/01/2023",
        Debut: "00:00",
        Fin: "24:00",
        state: "Terminée",
        imgpath: "/assets/imgJoin/Scrapping.png",
    },
]