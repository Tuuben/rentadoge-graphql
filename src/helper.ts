export function combineCollectionSnapshot(
  snapshot: FirebaseFirestore.QuerySnapshot,
) {
  return (
    snapshot.docs &&
    snapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() };
    })
  );
}

export function combineDocument(snapshot: FirebaseFirestore.DocumentSnapshot) {
  return snapshot && { id: snapshot.id, ...snapshot.data() };
}
