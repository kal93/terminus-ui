import { TsDatePipe } from './date.pipe';


describe(`TsDatePipe`, () => {
  let pipeClass: TsDatePipe;
  let pipe;
  let date;
  let originalGetTimezoneOffset;

  beforeEach(() => {
    pipeClass = new TsDatePipe();
    pipe = pipeClass.transform;
    date = '2018-02-08T05:00:00.000Z';

    // Save a reference to the original timezone method
    originalGetTimezoneOffset = Date.prototype.getTimezoneOffset;

    // Path the method to always return Eastern timezone offset
    Date.prototype.getTimezoneOffset = function() {
      return 300; // Eastern
    }
  });


  afterEach(() => {
    // Reset the timezone offset method
    Date.prototype.getTimezoneOffset = originalGetTimezoneOffset;
  });


  it(`should return null if no value is passed in`, () => {
    expect(pipe(null)).toEqual(null);
    expect(pipe('')).toEqual(null);
  });


  describe(`short format`, () => {

    it(`should format a date`, () => {
      const actual = pipe(new Date(date), 'short');
      const expected = '02/08/2018';

      expect(actual).toEqual(expected);
    });


    it(`should format a date string`, () => {
      const actual = pipe(date, 'short');
      const expected = '02/08/2018';

      expect(actual).toEqual(expected);
    });

  });


  describe(`medium format`, () => {

    it(`should format a date`, () => {
      const actual = pipe(date, 'medium');
      const expected = 'Feb 8 2018';

      expect(actual).toEqual(expected);
    });

  });


  describe(`extended format`, () => {

    it(`should format a date`, () => {
      const actual = pipe(date, 'extended');
      const expected = 'Feb 8 2018 12:00:00am';

      expect(actual).toEqual(expected);
    });

  });


  describe(`timestamp format`, () => {

    it(`should format a date`, () => {
      const actual = pipe(date, 'timestamp');
      const expected = '2018-02-08T05:00:00.000Z';

      expect(actual).toEqual(expected);
    });

  });


  describe(`if in dev mode`, () => {

    describe(`if the value is not a valid date`, () => {

      it(`should throw an error`, () => {
        const errFunc = () => pipe('foo');
        expect(errFunc).toThrowError(`'foo' is not a valid date.`);
      });

    });


    describe(`if the format is not valid`, () => {
      const message = `'foo' is not a valid format. Please see TsDateTypes for valid formats.`

      it(`should throw an error`, () => {
        const errFunc = () => pipe(date, 'foo');
        expect(errFunc).toThrowError(message);
      });

    });

  });

});
