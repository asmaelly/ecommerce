// backend/scripts/createUser.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: Date
});

const User = mongoose.model('User', userSchema);

async function createUser() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connecté à MongoDB Atlas');
    
    const existing = await User.findOne({ username: 'john_doe' });
    
    if (existing) {
      console.log('⚠️ Utilisateur existe déjà:', existing.username);
    } else {
      const hashedPassword = await bcrypt.hash('John@2024', 10);
      
      const user = new User({
        username: 'john_doe',
        email: 'john@example.com',
        password: hashedPassword,
        createdAt: new Date()
      });
      
      await user.save();
      console.log('✅ Utilisateur créé avec succès !');
      console.log('   Username: john_doe');
      console.log('   Password: John@2024');
    }
    
    const allUsers = await User.find().select('username email');
    console.log('\n📋 Liste des utilisateurs:');
    allUsers.forEach(u => {
      console.log(`   - ${u.username} (${u.email})`);
    });
    
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

createUser();