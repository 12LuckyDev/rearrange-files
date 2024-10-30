import { Observable, Subject } from 'rxjs';
import { RearrangeOptionsModel, RearrangeProgressModel, RearrangeSettingsModel } from '../models';
import { HandlerStage } from '../enums';
import fs from 'fs';
import path from 'path';
import { buildSettings, handleFile, prepare } from '../helpers';

export class RearrangeHandler {
  private _progressSubject: Subject<RearrangeProgressModel> = new Subject<RearrangeProgressModel>();

  private _current: number = 0;
  private _total: number = 0;
  private _stage: HandlerStage = HandlerStage.not_started;

  private _settings: RearrangeSettingsModel;

  constructor(options: string | RearrangeOptionsModel) {
    this._settings = buildSettings(options);
  }

  private sendProgress(): void {
    this._progressSubject.next({
      current: this._current,
      total: this._total,
      stage: this._stage,
    });
  }

  private async handleRearrange(): Promise<void> {
    try {
      await prepare(this._settings);

      const files = await fs.promises.readdir(this._settings.srcPath, {
        recursive: true,
        withFileTypes: true,
      });

      const filtered = files.filter((dirent) => dirent.isFile());

      this._stage = HandlerStage.files_loaded;
      this._total = filtered.length;
      this.sendProgress();

      this._stage = HandlerStage.in_progress;

      for (let i = 0; i < filtered.length; i++) {
        const { parentPath, name } = filtered[i];
        const oldPath = path.join(parentPath, name);

        await handleFile(oldPath, this._settings);
        this._current = i;
        this.sendProgress();
      }

      this._current = this._total;
      this._stage = HandlerStage.finished;
      this.sendProgress();
      this._progressSubject.complete();
    } catch (ex) {
      this._progressSubject.error(ex);
    }
  }

  public start(): Observable<RearrangeProgressModel> {
    this.handleRearrange();

    return this._progressSubject.asObservable();
  }
}
