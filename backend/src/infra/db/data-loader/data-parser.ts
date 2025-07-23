import { DataParsed } from "./data-parsed";
import * as fs from "fs";

enum Cols {
  YEAR = 0,
  TITLE,
  STUDIOS,
  PRODUCERS,
  WINNER
}

export class DataParser {
  public readonly dataParsed: DataParsed[] = [];
  public readonly producers: string[] = [];
  public readonly studios: string[] = [];

  async parse() {
    const rows = this.loadCsv();

    for (const row of rows) {
      const cols = row.split(';')

      const producersIds = this.extractProducers(cols[Cols.PRODUCERS]);
      const studiosIds = this.extractStudios(cols[Cols.STUDIOS]);

      this.dataParsed.push({
        id: this.dataParsed.length + 1,
        year: parseInt(cols[Cols.YEAR]),
        title: cols[Cols.TITLE],
        producers: producersIds,
        studios: studiosIds,
        winner: (cols[Cols.WINNER]) ? 1 : 0
      })
    }
  }

  private loadCsv() {
    const csv = fs.readFileSync('Movielist.csv', 'utf8')
    const rows = csv.split('\n');

    // remover cabeçalho
    rows.shift();

    // se a ultima linha for em branco, remover
    if (!rows[rows.length-1]) {
      rows.pop();
    }

    return rows;
  }

  private extractProducers(producers: string) {
    const ids: number[] = [];

    const producersArray = producers
      .replace('and', ', ')
      .split(',');

    for (const producer of producersArray) {
      const producerName = producer.trim();
      const idx = this.producers.indexOf(producerName);
      if (idx < 0) {
        this.producers.push(producerName);
        ids.push(this.producers.length);
      } else {
        ids.push(idx);
      }
    }

    return ids;
  }

  private extractStudios(studios: string) {
    const ids: number[] = [];

    const arr = studios.split(',');

    for (const item of arr) {
      const itemTrimmed = item.trim();
      const idx = this.studios.indexOf(itemTrimmed);
      if (idx < 0) {
        this.studios.push(itemTrimmed);
        ids.push(this.studios.length);
      } else {
        ids.push(idx);
      }
    }

    return ids;
  }
}
