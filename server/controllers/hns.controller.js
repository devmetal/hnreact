import * as Hns from '../models/hns';

export function topstories(req, res, next) {
  const limit = parseInt(req.params.limit, 10);
  Hns.topstories(limit).then(stories => {
    res.json(stories);
  }).catch(err => {
    next(err);
  });
}

export function newstories(req, res, next) {
  const limit = parseInt(req.params.limit, 10);
  Hns.newstories(limit).then(stories => {
    res.json(stories);
  }).catch(err => {
    next(err);
  });
}
