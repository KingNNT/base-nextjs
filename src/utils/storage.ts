import dayjs, { Dayjs } from "dayjs";

export type StoreValue<T> = {
  value: T;
  expiredAt?: Dayjs | Date;
};

export const StorageUtil = {
  get<T>(key: string) {
    const value = this.getDetail<T>(key);
    return value ? value.value : null;
  },

  getDetail<T>(key: string) {
    try {
      const value = localStorage.getItem(key);
      if (value) {
        const v: StoreValue<T> = JSON.parse(value);
        if (v.expiredAt) {
          if (dayjs(v.expiredAt) > dayjs()) {
            return v;
          } else {
            return null;
          }
        }
        return v;
      }
    } catch (err: Error | unknown) {
      if (err instanceof Error && err.message.includes("is not valid JSON")) {
        this.remove(key);
      }
      console.warn(`Storage get key:${key} error.`, err);
      return null;
    }
  },

  getMulti<T>(keys: string[]) {
    try {
      const values: T[] = [];
      for (const key of keys) {
        const value = this.get<T>(key);
        values.push(value as T);
      }
      return values;
    } catch (err) {
      console.error(`Storage get multi keys:${keys.join(",")} error.`, err);
      return [];
    }
  },

  set<T>(key: string, value: T, expire: Date | Dayjs | null = null) {
    const val: StoreValue<T> = {
      value: value,
    };
    if (expire) {
      val.expiredAt = expire;
    }
    localStorage.setItem(key, JSON.stringify(val));
  },

  remove(key: string) {
    localStorage.removeItem(key);
  },

  removeKeys(keys: string[]) {
    for (const key of keys) {
      this.remove(key);
    }
  },

  clear() {
    localStorage.clear();
  },
};
