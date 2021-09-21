import parseResponse from "./parseResponse";

describe("parseResponse()", () => {

    describe("should reject invalid data", () => {
        const examples = {
            "null": null,
            "undefined": undefined,
            "empty array": [],
            "array of numbers": [1,2,3],
            "empty object": {},
            "empty result array": {result: []},
            "empty results": {result: [{}, {}]},
            "invalid results": {result: [1,2,3]}
        }

        for (const [key, val] of Object.entries(examples)) {
            it(key, () => {
                const result = parseResponse(val)
                expect(result).toEqual({
                    error: true,
                    message: "Invalid postcode data received"
                })
            })
        }
    })

    describe("should process valid data", () => {
        const examples = {
            "single entry": [
                {
                    postcode: "NW1 6XE",
                    region: "Greater London",
                    country: "United Kingdom"
                }
            ],
            "two entries": [
                {
                    postcode: "NW1 6XE",
                    region: "Greater London",
                    country: "United Kingdom"
                },
                {
                    postcode: "NW3 6XE",
                    region: "Greater London",
                    country: "United Kingdom"
                },
            ],
            "multiple entries": [
                {
                    postcode: "NW1 6XE",
                    region: "Greater London",
                    country: "United Kingdom"
                },
                {
                    postcode: "NW3 6XE",
                    region: "Greater London",
                    country: "United Kingdom"
                },
                {
                    postcode: "NW4 6XE",
                    region: "Greater London",
                    country: "United Kingdom"
                },
            ]
        }

        for (const [key, val] of Object.entries(examples)) {
            it(key, () => {
                const result = parseResponse({ result: val })
                expect(result.error).toEqual(false);
                if (!result.error) {
                    expect(result.info).toEqual({
                        postcode: val[0],
                        nearby: val.slice(1)
                    })
                }
            })
        }
    })

    it("should strip unwanted fields", () => {
        const entry1 = {
            postcode: "NW1 6XE",
            region: "Greater London",
            country: "United Kingdom",
        }
        const entry2 = {
            postcode: "NW3 6XE",
            region: "Greater London",
            country: "United Kingdom",
        }
        const entry3 = {
            postcode: "NW4 6XE",
            region: "Greater London",
            country: "United Kingdom"
        }

        const result = [
            {
                ...entry1,
                x: 5,
            },
            {
                ...entry2,
                foo: "bar"
            },
            entry3,
        ]

        expect(parseResponse({ result })).toEqual({
            error: false,
            info: {
                postcode: entry1,
                nearby: [entry2, entry3]
            }
        })
    })

})