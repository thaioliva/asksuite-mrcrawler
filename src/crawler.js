import puppeteer from 'puppeteer';
const formatPrice = (obj) => {
  let price, description = '';

  if (obj.querySelector('.sincePrice').style.display === 'none') {
    price = obj.querySelector('.soldOut h6 a').innerHTML;
  } else {
    price += obj.querySelector('.sincePrice .sincePriceContent h6').innerHTML;
    description = obj.querySelector('.sincePrice .sincePriceContent p').innerHTML;
    description += ` ${price} `;
    description += obj.querySelector('.sincePrice .sincePriceContent p:nth-last-of-type(1)').innerHTML;
    price = Number(price
      .replace('R$', '')
      .replace(' ', '')
      .replace(',', '.'));
  }

  return { price, description };
};

const run = async (checkin, checkout) => {
  let mrcrawler = async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const urlParams = `${process.env.URL_SEARCH}CheckIn=${checkin}&CheckOut=${checkout}`;
    await page.goto(urlParams);
    let self = this;
    const result = await page.evaluate(() => {
      const rooms = []
      document.querySelectorAll('.roomName')
        .forEach(room => {
          const title = room.querySelector('.excerpt h5 a').innerHTML || '';
          const images = [];
          room.querySelectorAll('.thumb .roomSlider .slide').forEach((item) => {
            const image = item.querySelector('a img').getAttribute('src');
            if (!image) return;
            images.push(image);
          });

          let price = '';
          let priceDescription = '';
          if (room.querySelector('.sincePrice').style.display === 'none') {
            price = room.querySelector('.soldOut h6 a').innerHTML;
          } else {
            price += room.querySelector('.sincePrice .sincePriceContent h6').innerHTML;
            priceDescription = room.querySelector('.sincePrice .sincePriceContent p').innerHTML;
            priceDescription += ` ${price} `;
            priceDescription += room.querySelector('.sincePrice .sincePriceContent p:nth-last-of-type(1)').innerHTML;
            price = Number(price
              .replace('R$', '')
              .replace(' ', '')
              .replace(',', '.'));
          }

          const description = room.querySelector('.excerpt p .description').innerHTML || '';
          const roomObj = {
            title,
            images,
            price,
            priceDescription,
            description,
          };
          rooms.push(roomObj);
        });
      return rooms;
    })

    await browser.close();
    return result
  };

  const value = await mrcrawler();

  return value;
}

module.exports = {
  run
};
