export function fetchProfileData() {
    let suggestionsPromise = fetchSuggestions(); // todo how to pass parameter
    return {
        suggestions: wrapPromise(suggestionsPromise)
    };
}

// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
function wrapPromise(promise: Promise<any>) {
    let status = "pending";
    let result: any;
    let suspender = promise.then(
        (r) => {
            status = "success";
            result = r;
        },
        (e) => {
            status = "error";
            result = e;
        }
    );
    return {
        read() {
            console.log("status --- ", status);
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return JSON.parse(result)?.results?.
                    filter((item: any) => item?.title?.includes('Rihanna'));
            }
        }
    };
}

// function fetchUser() {
//     console.log("fetch user...");
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log("fetched user");
//             resolve({
//                 name: "Ringo Starr"
//             });
//         }, 1000);
//     });
// }

function fetchSuggestions() {
    console.log("fetch Suggestions...");
    // return fetch(`http://localhost:3003/music/artist/${query}`)
    return fetch(`http://localhost:3003/music/artist/Rihanna`)// todo pass param??
            .then((res) => {
                return res.text();
                // return res;
            })
            // .then(
            //     (result) => {
            //         console.log('result artist --- ', result);
            //         // setSuggestions(JSON.parse(result)?.results);
            //     },
            //     // Примечание: важно обрабатывать ошибки именно здесь, а не в блоке catch(),
            //     // чтобы не перехватывать исключения из ошибок в самих компонентах.
            //     (error) => {
            //         console.log('error artist --- ', error);
            //     },
            // );
}
