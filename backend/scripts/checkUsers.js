// backend/checkUsers.js
require('dotenv').config();
const mongoose = require('mongoose');

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas');
    
    // Afficher la base de données
    console.log('📚 Base de données:', mongoose.connection.db.databaseName);
    
    // Lister les collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📁 Collections:', collections.map(c => c.name));
    
    // Chercher les utilisateurs
    const users = await mongoose.connection.db.collection('users').find().toArray();
    console.log(`\n👥 Nombre d'utilisateurs: ${users.length}`);
    
    if (users.length > 0) {
      console.log('\n📋 Utilisateurs trouvés:');
      users.forEach(u => {
        console.log(`   - Username: ${u.username}, Email: ${u.email}`);
      });
    } else {
      console.log('\n⚠️ Aucun utilisateur trouvé dans la collection "users"');
      console.log('💡 Vous devez en créer un.');
    }
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

checkUsers();