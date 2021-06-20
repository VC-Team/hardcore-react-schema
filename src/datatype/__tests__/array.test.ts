import { array, string, ArrayType } from '../';
import { ErrorSet, InvalidTypeError, TooSmallError } from '../../error';

describe("DataType Array", () => {
    const subject = array(string());

    it('should have instance of ArrayType', () => {
        expect(subject).toBeInstanceOf(ArrayType);

        const dataParser = ["1"];
        expect(subject.parser(dataParser)).toEqual(dataParser);
    });

    it('should throw an InvalidTypeError error', () => {
        try {
            subject.parser(null)
        } catch (err) {
            expect(err).toBeInstanceOf(ErrorSet);
            expect(err.errors[0]).toBeInstanceOf(InvalidTypeError);
        }
    });

    it('should throw an InvalidTypeError error when given a deepTryParser', () => {
        const subject = array(string());
        
        try {
            subject.parser(["deepTryParser", 1], { deepTryParser: true, paths: [] });
        } catch (err) {
            expect(err).toBeInstanceOf(ErrorSet);
            expect(err.errors[0]).toBeInstanceOf(InvalidTypeError);
        }
    })

    describe('NoEmpty', () => {
        const subject = array(string()).noempty();
        expect(subject).toBeInstanceOf(ArrayType);
        expect(subject.parser(["1"]).length).toBeGreaterThan(0);

        it('should throw a TooSmallError error', () => {
            try {
                subject.parser(subject.parser([]))
            } catch (err) {
                expect(err).toBeInstanceOf(ErrorSet);
                expect(err.errors[0]).toBeInstanceOf(TooSmallError);
            }
        });
    });
});
