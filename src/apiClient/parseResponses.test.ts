import { parseNearest, parsePostCode } from "./parseResponses";

describe("parsePostCode()", () => {

  describe("should reject invalid data", () => {
    const examples = {
      "null": null,
      "undefined": undefined,
      "empty array": [],
      "array of numbers": [1,2,3],
      "empty object": {},
      "result is array": {result: [{}, {}]},
      "invalid result": {result: {foo: "bar"}}
    }

    for (const [key, val] of Object.entries(examples)) {
      it(key, () => {
        const result = parsePostCode(val)
        expect(result).toEqual({
          error: true,
          message: "Invalid postcode data received"
        })
      })
    }
  })

  it("should process valid data", () => {
    const data = {
      postcode: "NW1 6XE",
      region: "Greater London",
      country: "United Kingdom"
    };
    const response = {
      result: data
    };
    const parsed = parsePostCode(response);
    expect(parsed.error).toBeFalsy()
    if (!parsed.error) {
      expect(parsed.info).toEqual(data)
    }
  });

  it("should remove unwanted fields", () => {
    const data = {
      postcode: "NW1 6XE",
      region: "Greater London",
      country: "United Kingdom"
    };
    const response = {
      result: {
        ...data,
        x: 88
      }
    };
    const parsed = parsePostCode(response);
    expect(parsed.error).toBeFalsy()
    if (!parsed.error) {
      expect(parsed.info).toEqual(data)
    }
  });

});

describe("parseNearest()", () => {

  describe("should reject invalid data", () => {
    const examples = {
      "null": null,
      "undefined": undefined,
      "empty array": [],
      "array of numbers": [1,2,3],
      "empty object": {},
      "empty results": {result: [{}, {}]},
      "invalid results": {result: [1,2,3]}
    }

    for (const [key, val] of Object.entries(examples)) {
      it(key, () => {
        const result = parseNearest(val)
        expect(result).toEqual({
          error: true,
          message: "Invalid postcode data received"
        })
      })
    }
  })

  describe("should process valid data", () => {
    const examples = {
      "empty": [],
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
        const result = parseNearest({ result: val })
        expect(result.error).toEqual(false);
        if (!result.error) {
          expect(result.nearest).toEqual(val)
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

    expect(parseNearest({ result })).toEqual({
      error: false,
      nearest: [entry1, entry2, entry3]
    })
  })

})