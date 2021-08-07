function List (head, tail) {
  return function (destructureNode, _) {
    return destructureNode(head, tail)
  }
}

function Nil (_, destructureNil) {
  return destructureNil()
}

const testList = List({ a: 1 }, List({ a: 2 }, List({ a: 3 }, List({ a: 4 }, List({ a: 5 }, Nil)))))

console.log(toArray(testList))

function head (list) {
  return list(function (h, _) {
    return h;
  }, function () {
    throw new Error('Empty List has no head')
  })
}

function tail (list) {
  return list(function (_, t) {
    return t
  }, function () {
    throw new Error('Empty List has no tail')
  })
}

function toArray (list) {
  return list(function (head, tail) {
    return [head].concat(toArray(tail))
  }, function () {
    return []
  });
}

function concat (first, second) {
  return first(function (head, tail) {
    return List(head, concat(tail, second))
  }, function () {
    return second
  })
}

function append (val, list) {
  return list(function (head, tail) {
    return List(head, append(val, tail))
  }, function () {
    return List(val, Nil)
  })
}

function reverse (list) {
  return list(function (head, tail) {
    return append(head, reverse(tail))
  }, function () {
    return Nil
  })
}

function get (n, list) {
  return list(function (head, tail) {
    if (n === 0) {
      return head
    } else {
      return get((n - 1), tail);
    }
  }, function () {
    throw new Error('Index requested is outside the bounds of this List')
  })
}

function update (list, i, val) {
  return list(function (head, tail) {
    if (i === 0) {
      return List(val, tail);
    } else {
      return List(head, update(tail, (i - 1), val));
    }
  }, function () {
    throw new Error('Index requests is outside the bounds of this List');
  });
}

const testList2 = update(testList, 2, { b: 1 })
console.log(toArray(testList))
console.log(toArray(testList2))
console.log(get(1, testList), '===', get(1, testList2), get(1, testList) === get(1, testList2));
console.log(get(2, testList), '===', get(2, testList2), get(2, testList) === get(2, testList2));
console.log({ a: 2 }, "===", { a: 2 }, { a: 2 } === { a: 2 })
