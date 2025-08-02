async function greeting (params) {
    try {
        const response = await fetch('https://supersimplebackend.dev/greeting', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            // body : JSON.stringify({
            //     name: 'Nabin'
            // })
        })
        if (response.status >= 400) {
            throw response;
        }
        console.log(response.text());
    } catch (error) {
        if(error.status === 400) {
            const errorMessage = await error.text();
            console.log(errorMessage);
        } else {
            console.log("Network Error")
        }
        
    }
}
greeting();