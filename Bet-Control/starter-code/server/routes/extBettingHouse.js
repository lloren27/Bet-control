


router.put("/:id", (req, res, next) => {
    console.log(req.body)
    const updates = _.pick(req.body, fields);
    console.log(updates)
    Model.findByIdAndUpdate(req.params.id, updates, { new: true })
      .then(object => res.json(object))
      .catch(e => next(e));
  });