MIT License

Copyright (c) 2023, Peter Okorafor

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

  { /* useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      const response = await fetch(
        `https://api.airvisual.com/v2/city?city=${cityId}&state=${stateId}&country=${countryId}&key=392bf691-dca6-4164-b5cc-c70cfe7acd3d`,
      );
      const data = await response.json();

      if (isMounted) {
        setInfo(data.data);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      setLoading(false);
    };
  }, [countryId, stateId, cityId]);
    */ }