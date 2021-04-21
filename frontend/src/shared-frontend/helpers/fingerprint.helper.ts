import * as Fingerprint2 from 'fingerprintjs2';
import * as UAParser from 'ua-parser-js';

const getFingerprint = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (localStorage.getItem('fingerprint')) {
      return localStorage.getItem('fingerprint');
    }

    const getHash = async (): Promise<string> => {
      const options: Fingerprint2.Options = {
        preprocessor: (key: string, value: string): string => {
          if (key === 'userAgent') {
            const parser = new UAParser(value);
            // return customized user agent (without browser version)
            return `${parser.getOS().name} :: ${parser.getBrowser().name} :: ${parser.getEngine().name}`;
          }
          return value;
        },
        excludes: {
          plugins: true,
          localStorage: true,
          adBlock: true,
          screenResolution: true,
          availableScreenResolution: true,
          enumerateDevices: true,
          pixelRatio: true,
          doNotTrack: true,
        },
      };

      try {
        const components = await Fingerprint2.getPromise(options);
        const values = components.map(component => component.value);
        console.log('fingerprint hash components', components);

        return String(Fingerprint2.x64hash128(values.join(''), 31));
      } catch (e) {
        reject(e);
      }

      return '';
    };

    console.log('get fp hash @ setTimeout');
    setTimeout(async () => {
      const hash = await getHash();
      localStorage.setItem('fingerprint', hash);
      resolve(hash);
    }, 500);
  });
};

export { getFingerprint };
